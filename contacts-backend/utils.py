import json
from typing import List, Type

from app.db.base import Base


def to_json(items: List[Type[Base]]) -> str:
    return json.dumps([item.to_dict() for item in items], default=str)
