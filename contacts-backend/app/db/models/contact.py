from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, event

from app.db.base import Base
from app.db.models.history import History
from redis_client import publish_contact_change


class Contact(Base):
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    phone = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.now)

    def get_snapshot_data(self) -> dict:
        return {
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "phone": self.phone,
        }

    def save_history_snapshot(self, db):
        snapshot_data = self.get_snapshot_data()
        history = History(contact_id=self.id, data=snapshot_data)
        db.add(history)
        db.commit()
        db.refresh(history)
        return history

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    @staticmethod
    def after_change(mapper, connection, target):
        publish_contact_change()


event.listen(Contact, "after_insert", Contact.after_change)
event.listen(Contact, "after_update", Contact.after_change)
event.listen(Contact, "after_delete", Contact.after_change)
