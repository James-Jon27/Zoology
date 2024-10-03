from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod
from .tables import saved_creatures_table

class Creature(db.Model):
    __tablename__ = "creatures"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    image = db.Column(db.String(500), nullable=False)
    name = db.Column(db.String, nullable=False, unique=True)
    category = db.Column(db.String,nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    origin = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    #! Relationships
    user = db.relationship("User", back_populates="creatures")
    lore = db.relationship("Lore", back_populates="creature", cascade="all, delete")
    
    #! Many to Many
    saves = db.relationship("User", secondary=saved_creatures_table, back_populates="saved")
    
    def to_dict_basic(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'image': self.image,
            'name' : self.name,
            'category': self.category,
            'description' : self.description,
            'origin': self.origin,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }

    def to_dict(self):
        return {
            **self.to_dict_basic(),
            "user": self.user.to_dict_basic(),
            "lore": [marble.to_dict_basic() for marble in self.lore],
            "saves": [saved_creature.to_dict_basic() for saved_creature in self.saves],
        }