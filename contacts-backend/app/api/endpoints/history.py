from typing import List

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.crud import get_db
from app.crud.history import (
    get_contact_history,
)
from app.schemas.history import HistoryBase

router = APIRouter(tags=["History"])


@router.get(
    "",
    response_model=List[HistoryBase],
    summary="List all contacts",
    description="List all contacts",
)
def get_history_for_contact_id(
    db: Session = Depends(get_db), contact_id: int = Query(description="Contact ID")
):
    return get_contact_history(db=db, contact_id=contact_id)
