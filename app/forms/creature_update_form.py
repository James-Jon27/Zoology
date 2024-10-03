from flask_wtf import FlaskForm
from wtforms import StringField, ValidationError
from wtforms.validators import DataRequired, Length
from wtforms import SubmitField
from app.models.creatures import Creature


def creature_exists(form, field):
    # Checking if creature is already in use
    creature = field.data
    creature = Creature.query.filter(Creature.name == creature).first()
    if creature:
        raise ValidationError("creature is already in use.")


class CreatureUpdateForm(FlaskForm):
    name = StringField("name", validators=[DataRequired(), creature_exists])
    category = StringField("category", validators=[DataRequired()])
    description = StringField(
        "description", validators=[DataRequired(), Length(0, 1000)]
    )
    origin = StringField("origin")
    submit = SubmitField("Create Creature")
