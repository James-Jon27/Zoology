from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, ValidationError
from wtforms.validators import DataRequired, Length
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField
from app.api.boto_file import ALLOWED_EXTENSIONS
from app.models.creatures import Creature

def creature_exists(form, field):
    # Checking if creature is already in use
    creature = field.data
    creature = Creature.query.filter(Creature.name == creature).first()
    if creature:
        raise ValidationError("creature is already in use.")
class CreatureForm(FlaskForm):
    name = StringField("name", validators=[DataRequired(), creature_exists])
    category = StringField("category", validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired(), Length(350)])
    origin =StringField("origin")
    image = FileField(
        "Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))]
    )
    submit = SubmitField("Create Creature")