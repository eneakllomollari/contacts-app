import datetime
from typing import Optional

from pydantic import BaseModel


class HistoryBase(BaseModel):
    id: int
    first_name: Optional[str]
    last_name: Optional[str]
    email: Optional[str]
    phone: Optional[str]
    created_at: Optional[datetime.datetime]
