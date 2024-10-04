from datetime import datetime
from .tables import saved_creatures_table
from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    
    #! Relationships
    creatures = db.relationship("Creature", back_populates="user", cascade="all, delete")
    lore = db.relationship("Lore", back_populates="user", cascade="all, delete")
    
    #! Many to Many
    saved = db.relationship("Creature", secondary=saved_creatures_table, back_populates="saves")


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict_basic(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'createdAt': self.created_at
        }

    def to_dict(self):
        return {
            **self.to_dict_basic(),
            "creatures": [creature.to_dict_basic() for creature in self.creatures],
            "saved" : [saved_creature.to_dict_basic() for saved_creature in self.saved],
            "lore" : [marble.to_dict_basic() for marble in self.lore],
        }
