from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

user_routes = Blueprint("users", __name__)


@user_routes.route("/")
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route("/<int:id>")
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    if not user: 
        return {"errors": "Zookeeper Not found"}, 404
        
    return user.to_dict()


@user_routes.route("/<int:id>/saves")
def userSaves(id):
    """
    Query for a user by id and returns that users saved creatures
    """
    user = User.query.get(id)
    user.to_dict()
    creatures = user.saved
    return {
        "creatures": {creature.id: creature.to_dict_basic() for creature in creatures}
   }


@user_routes.route("/<int:id>/creatures")
def userCreatures(id):
    """
    Query for a user by id and returns that users posted creatures
    """
    user = User.query.get(id)
    user.to_dict()
    creatures = user.creatures
    return {
        "creatures": {creature.id: creature.to_dict_basic() for creature in creatures}
    }


