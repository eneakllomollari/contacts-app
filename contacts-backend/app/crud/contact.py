import logging

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.db.models.contact import Contact
from app.schemas.contact import ContactCreate, ContactUpdate

logger = logging.getLogger(__name__)


def create_contact(db: Session, contact: ContactCreate):
    db_contact = Contact(**contact.dict())
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)

    try:
        db_contact.save_history_snapshot(db=db)
    except Exception:
        logger.error(
            "Error saving contact history for contact ID: {db_contact.id}",
            exc_info=True,
        )

    return db_contact


def get_contacts(db: Session):
    return db.query(Contact).order_by(Contact.created_at.desc()).all()


def get_contact(db: Session, contact_id: int):
    db_contact = db.query(Contact).filter(Contact.id == contact_id).first()
    if not db_contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    return db_contact


def update_contact(db: Session, contact_id: int, contact: ContactUpdate):
    db_contact = get_contact(db=db, contact_id=contact_id)
    has_changes = False
    for key, value in contact.dict().items():
        has_changes = has_changes or getattr(db_contact, key) != value
        setattr(db_contact, key, value)
    db.commit()

    if has_changes:
        try:
            db_contact.save_history_snapshot(db=db)
        except Exception:
            logger.error(
                "Error saving contact history for contact ID: {db_contact.id}",
                exc_info=True,
            )

    return db_contact


def delete_contact(db: Session, contact_id: int):
    db_contact = db.query(Contact).filter(Contact.id == contact_id).first()
    if not db_contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    db.delete(db_contact)
    db.commit()

    return
