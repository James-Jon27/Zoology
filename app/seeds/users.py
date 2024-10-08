from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
demo = User(
    username="Demo",
    email="demo@aa.io",
    first_name="Demo",
    last_name="Lition",
    password="password",
)
jimmy = User(
    username="JimmyBuckets",
    email="jimmy@aa.io",
    first_name="Jimmy",
    last_name="Buckets",
    password="123456789",
)
saul = User(
    username="SaulSage",
    email="saul@aa.io",
    first_name="Saul",
    last_name="Bates",
    password="123456789",
)


def seed_users():
    db.session.add(demo)
    db.session.add(jimmy)
    db.session.add(saul)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
