import asyncio
import logging

from fastapi import FastAPI, APIRouter, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.exc import IntegrityError

import utils
from app.api.endpoints import contacts, history
from app.core.config import settings
from app.crud.contact import get_contacts
from app.db.base import Base
from app.db.session import engine, SessionLocal
from redis_client import pubsub

logger = logging.getLogger(__name__)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    summary="FastAPI-based backend for managing contacts",
)

background_tasks = []

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # can alter with time
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
Base.metadata.create_all(bind=engine)

api_router = APIRouter()
api_router.include_router(contacts.router, prefix="/contacts")
api_router.include_router(history.router, prefix="/history")

app.include_router(api_router, prefix="/v2")


async def redis_listener():
    pubsub.subscribe("contact_changes")

    while True:
        message = pubsub.get_message()
        if (
            message
            and message["type"] == "message"
            and message["channel"].decode("utf-8") == "contact_changes"
        ):
            db = SessionLocal()
            try:
                await contacts.manager.broadcast(utils.to_json(get_contacts(db=db)))
            finally:
                db.close()
        await asyncio.sleep(0.1)


@app.on_event("startup")
async def startup_event():
    task = asyncio.create_task(redis_listener())
    background_tasks.append(task)


@app.on_event("shutdown")
async def shutdown_event():
    for task in background_tasks:
        logger.info('Canceling background task')
        task.cancel()
        await task


@app.get("/", include_in_schema=False)
def read_root():
    return {"message": "Welcome to the Contacts API"}


@app.exception_handler(IntegrityError)
async def unicorn_exception_handler(_: Request, exc: IntegrityError):
    name = exc.orig.diag.constraint_name or "field"
    if name == "contact_email_key":
        name = "email"
    return JSONResponse(
        status_code=400,
        content={"message": f"Oops! {name.title()} already exists"},
    )


# polling_thread = threading.Thread(target=poll_for_changes, daemon=True)
# polling_thread.start()
