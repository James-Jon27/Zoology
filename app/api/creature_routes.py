from flask import Blueprint, request
from flask_login import current_user, login_required
from app.api.boto_file import (
    get_unique_filename,
    remove_file_from_s3,
    upload_file_to_s3,
)
from app.forms.creature_form import CreatureForm
from app.forms.creature_update_form import CreatureUpdateForm
from app.forms.marble_form import MarbleForm
from app.models import Creature, Lore, db

creature_routes = Blueprint("creatures", __name__)


def format_errors(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = dict()

    for field in validation_errors:
        errorMessages[field] = [error for error in validation_errors[field]]

    return errorMessages


@creature_routes.route("/")
def creatures():
    """
    Query for all Creatures
    """

    creatures = Creature.query.all()
    return {
        "creatures": {creature.id: creature.to_dict_basic() for creature in creatures}
    }


@creature_routes.route("", methods=["POST"])
@login_required
def make_creature():
    form = CreatureForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        image = form.data["image"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print(upload)

        if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when you tried to upload
            # so you send back that error message (and you printed it above)
            return format_errors(form.errors), 400

        url = upload["url"]
        new_creature = Creature(
            image=url,
            user=current_user,
            name=form.data["name"].title(),
            category=form.data["category"],
            description=form.data["description"],
            origin=form.data["origin"],
        )
        db.session.add(new_creature)
        db.session.commit()
        return new_creature.to_dict()

    if form.errors:
        return {"errors": format_errors(form.errors)}, 400


@creature_routes.route("/<int:id>")
def creature(id):
    """
    Query for getting a specific creature
    """
    creature = Creature.query.get(id)
    if not creature:
        return {"errors": "Creature Not Found"}, 404

    return creature.to_dict()


@creature_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_creature(id):
    """
    Query for updating a specific creature
    """
    creature = Creature.query.get(id)
    form = CreatureUpdateForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if not creature:
        return {"errors": "Creature Not Found"}, 404

    if creature.user_id != current_user.id:
        return {"errors": "This is not your Creature"}, 403

    if form.validate_on_submit():
        creature.name = form.data["name"].title()
        creature.category = form.data["category"]
        creature.description = form.data["description"]
        creature.origin = form.data["origin"]

        db.session.commit()
        return creature.to_dict()

    return {"errors": format_errors(form.errors)}, 400


@creature_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_creature(id):
    """
    Query for deleting a specific creature
    """
    creature = Creature.query.get(id)

    if not creature:
        return {"errors": "Creature Not Found"}, 404

    if creature.user_id != current_user.id:
        return {"errors": "This is not your Creature"}, 403

    remove_file_from_s3(creature.image)
    db.session.delete(creature)
    db.session.commit()

    return {"message": "Deleted"}


@creature_routes.route("/<int:id>/lore", methods=["POST"])
@login_required
def new_lore(id):
    """
    Query for add lore to a specific creature
    """
    creature = Creature.query.get(id)

    if not creature:
        return {"errors": "Creature Not Found"}, 404

    form = MarbleForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_marble = Lore(
            title=form.data["title"].title(),
            story=form.data["story"],
            creature=creature,
            user=current_user,
        )

        db.session.add(new_marble)
        db.session.commit()
        return new_marble.to_dict()

    return {"errors": format_errors(form.errors)}, 400


@creature_routes.route("/<int:id>/save", methods=["POST"])
@login_required
def save_creature(id):
    """
    Query for deleting a specific creature
    """
    creature = Creature.query.get(id)

    if not creature:
        return {"errors": "Creature Not Found"}, 404

    if current_user in creature.saves:
        return {"errors": "Already Saved Creature"}, 406

    creature.saves.append(current_user)
    db.session.commit()
    return creature.to_dict()


@creature_routes.route("/<int:id>/save", methods=["DELETE"])
@login_required
def delete_save_creature(id):
    """
    Query for deleting a specific creature
    """
    creature = Creature.query.get(id)

    if not creature:
        return {"errors": "Creature Not Found"}, 404

    if current_user not in creature.saves:
        return {"errors": "Creature Not Saved"}, 406

    creature.saves.remove(current_user)
    db.session.commit()
    return creature.to_dict()
