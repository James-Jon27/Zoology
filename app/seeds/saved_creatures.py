from app.models import db, User, Creature, environment, SCHEMA
from app.models.tables import saved_creatures_table
from sqlalchemy.sql import text

def seed_saved_creatures():
    users = User.query.all()
    creatures = Creature.query.all()

    associations = [
        (1, 18),
        (1, 3),
        (1, 2),
        (1, 5),
        (1, 17),
        (1, 6),
    ]

    for user_id, creature_id in associations:
        db.session.execute(
            saved_creatures_table.insert().values(user_id=user_id, creature_id=creature_id)
        )
    db.session.commit()

def undo_saved_creatures():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.saved_creatures RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM saved_creatures"))

    db.session.commit()