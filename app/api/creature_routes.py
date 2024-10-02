from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.api.boto_file import get_unique_filename, upload_file_to_s3
from app.forms.creature_form import CreatureForm
from app.models import Creature, db

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
    return {'creatures': [creature.to_dict_basic() for creature in  creatures]}


@creature_routes.route("/", methods=["POST"])
@login_required
def make_creature():
    form = CreatureForm()

    if form.validate_on_submit():
        image = form.data["image"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print(upload)

        if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when you tried to upload
            # so you send back that error message (and you printed it above)
            return format_errors(form.errors), 500

        url = upload["url"]
        new_creature = Creature()
        form.populate_obj(new_creature)
        db.session.add(new_creature)
        db.session.commit()

    if form.errors:
        return {"errors": format_errors(form.errors)}
    


@creature_routes.route("/<int:id>")
def creature(id):
    """
    Query for getting a specific creature
    """
    creature = Creature.get(id)
    return creature.to_dict()