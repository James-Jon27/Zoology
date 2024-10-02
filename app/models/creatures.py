from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Creature(db.Model):
    __tablename__ = "creatures"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    image = db.Column(db.String, nullable=False)
    name = db.Column(db.String, nullable=False)
    category = db.Column(db.String),
    description = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    #! Relationships
    user = db.relationship("User", back_populates="creature")
    # lore = db.relationship("Lore", back_populates="creature", cascade="all, delete")
    
    def to_dict_basic(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'image': self.image,
            'name' : self.name,
            'category': self.category,
            'description' : self.description,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }