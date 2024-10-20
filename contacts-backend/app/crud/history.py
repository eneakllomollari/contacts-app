from sqlalchemy.orm import Session

from app.db.models.history import History


def get_contact_history(db: Session, contact_id: int):
    return (
        db.query(History)
        .filter(History.contact_id == contact_id)
        .order_by(History.created_at.desc())
        .all()
    )
