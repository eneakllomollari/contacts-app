import os

from dotenv import load_dotenv
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "Contacts API"
    VERSION: str = "1.0.0"
    MODE: str = os.getenv("MODE")

    DATABASE_URL: str = os.getenv("DATABASE_URL")
    REDIS_URL: str = os.getenv("REDIS_URL")

    class Config:
        case_sensitive = True


load_dotenv()

settings = Settings()
