from sqlalchemy.ext.declarative import as_declarative, declared_attr


# Base class for all models
@as_declarative()
class Base:
    id: any
    __name__: str

    # Automatically generate table names from class names
    @declared_attr
    def __tablename__(cls) -> str:
        return cls.__name__.lower()


# # Import all the models so that Alembic and SQLAlchemy can recognize them
# from app.db.models.contact import Contact  # Import your models here
