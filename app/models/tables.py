from sqlalchemy import ForeignKey, Integer
from .db import db, environment, SCHEMA, add_prefix_for_prod

saved_creatures_table = db.Table(
    "saved_creatures",
    db.Column(
        "user_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("users.id")),
        primary_key=True
    ),
    db.Column(
        "creature_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("creatures.id")),
        primary_key=True
    ),
    schema=SCHEMA if environment == "production" else None
)