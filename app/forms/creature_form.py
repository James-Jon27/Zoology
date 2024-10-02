from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, Length
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField
from app.api.boto_file import ALLOWED_EXTENSIONS

class CreatureForm(FlaskForm):
    name = StringField("Name")
    image = FileField(
        "Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))]
    )
    submit = SubmitField("Create Creature")