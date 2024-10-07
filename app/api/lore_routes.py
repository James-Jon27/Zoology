from flask import Blueprint, request
from flask_login import login_required, current_user
from app.forms.marble_form import MarbleForm
from app.models import db, Lore

lore_routes = Blueprint("lore", __name__)

def format_errors(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = dict()

    for field in validation_errors:
        errorMessages[field] = [error for error in validation_errors[field]]

    return errorMessages


@lore_routes.route("/<int:id>")
def marble(id):
    """
    Query to get a specific marble
    """
    marble = Lore.query.get(id)

    if not marble:
        return {"errors": "Marble Not Found"}, 404

    return marble.to_dict()


@lore_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_marble(id):
    """
    Query to update a specific marble
    """
    marble = Lore.query.get(id)

    if not marble:
        return {"errors": "Marble Not Found"}, 404

    if marble.user_id != current_user.id:
        return {"errors" : "This is not your marble"}, 403

    form = MarbleForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        marble.title=form.data['title'].title()
        marble.story=form.data['story']

        db.session.commit()
        return marble.to_dict()

    return {"errors" : format_errors(form.errors)}, 400


@lore_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_mable(id):
    """
    Query to delete a specific marble
    """
    marble = Lore.query.get(id)

    if not marble:
        return {"errors": "Marble Not Found"}, 404

    if marble.user_id != current_user.id:
        return {"errors": "This is not your marble"}, 403

    db.session.delete(marble)
    db.session.commit()

    return {"message": "Deleted"}