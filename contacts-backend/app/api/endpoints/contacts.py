import asyncio
import logging
import time
from typing import List

from fastapi import Depends, APIRouter, WebSocket
from sqlalchemy.orm import Session

import utils
from app.connection_manager import ConnectionManager
from app.crud import get_db
from app.crud.contact import (
    create_contact,
    get_contacts,
    update_contact,
    delete_contact,
    get_contact,
)
from app.schemas.contact import ContactCreate, ContactUpdate, Contact

logger = logging.getLogger(__name__)
manager = ConnectionManager()

router = APIRouter(tags=["Contacts"])


@router.post(
    "",
    response_model=Contact,
    summary="Create a new contact",
    description="Create a new contact",
)
def create_contact_api(contact: ContactCreate, db: Session = Depends(get_db)):
    time.sleep(20)
    return create_contact(db=db, contact=contact)


@router.get(
    "",
    response_model=List[Contact],
    summary="List all contacts",
    description="List all contacts",
)
def list_contacts_api(db: Session = Depends(get_db)):
    return get_contacts(db=db)


@router.get(
    "/{contact_id}",
    response_model=Contact,
    summary="Get a contact",
    description="Get a contact",
)
def get_contact_api(contact_id: int, db: Session = Depends(get_db)):
    return get_contact(db=db, contact_id=contact_id)


@router.put(
    "/{contact_id}",
    response_model=Contact,
    summary="Update a contact",
    description="Update a contact",
)
def update_contact_api(
    contact_id: int, contact: ContactUpdate, db: Session = Depends(get_db)
):
    return update_contact(db=db, contact_id=contact_id, contact=contact)


@router.delete(
    "/{contact_id}",
    summary="Delete a contact",
    description="Delete a contact",
)
def delete_contact_api(contact_id: int, db: Session = Depends(get_db)):
    return delete_contact(db=db, contact_id=contact_id)


@router.websocket("")
async def websocket_endpoint(websocket: WebSocket, db: Session = Depends(get_db)):
    await manager.connect(websocket)
    message = utils.to_json(get_contacts(db))
    await manager.broadcast(message)
    while True:
        await asyncio.sleep(2)
