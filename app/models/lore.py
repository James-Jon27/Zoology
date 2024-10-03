from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Lore(db.Model):
    __tablename__ = "lore"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    creature_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("creatures.id")), nullable=False
    )
    title = db.Column(db.String(50), nullable=False)
    story = db.Column(db.Text(10000), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    user = db.relationship("User", back_populates="lore")
    creature = db.relationship("Creature", back_populates="lore")

    def to_dict_basic(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "creature_id": self.creature_id,
            "title": self.title,
            "story": self.story,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
        }

    def to_dict(self):
        return {
            **self.to_dict_basic(),
            "user" : self.user.to_dict_basic(),
            "creature": self.creature.to_dict_basic()
        }
