from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import Creature

creature_routes = Blueprint("creatures", __name__)

@creature_routes.route("/")
def creatures():
    """
    Query for all Creatures
    """

    creatures = Creature.query.all()
    return {'creatures': [creature.to_dict_basic() for creature in  creatures]}


@creature_routes.route("/<int:id>")
def creature(id):
    """
    Query for getting a specific creature
    """
    creature = Creature.get(id)
    return creature.to_dict()

@creature_routes.route("/new", methods=["POST"])
@login_required
def make_creature():
    return