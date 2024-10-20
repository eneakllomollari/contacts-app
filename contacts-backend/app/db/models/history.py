from datetime import datetime
from typing import Optional

from sqlalchemy import Column, Integer, ForeignKey, DateTime, JSON
from sqlalchemy.orm import relationship, backref

from app.db.base import Base


class History(Base):
    id = Column(Integer, primary_key=True, index=True)
    contact_id = Column(Integer, ForeignKey("contact.id"), nullable=False)
    contact = relationship(
        "Contact", backref=backref("histories", cascade="all, delete-orphan")
    )
    created_at = Column(DateTime, nullable=False, default=datetime.now)
    data = Column(JSON)

    @property
    def first_name(self) -> Optional[str]:
        return self.data.get("first_name")

    @property
    def last_name(self) -> Optional[str]:
        return self.data.get("last_name")

    @property
    def email(self) -> Optional[str]:
        return self.data.get("email")

    @property
    def phone(self) -> Optional[str]:
        return self.data.get("phone")
