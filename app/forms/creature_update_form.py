from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length
from wtforms import SubmitField


class CreatureUpdateForm(FlaskForm):
    name = StringField("name", validators=[DataRequired()])
    category = StringField("category", validators=[DataRequired()])
    description = StringField(
        "description", validators=[DataRequired(), Length(0, 1000)]
    )
    origin = StringField("origin")
    submit = SubmitField("Create Creature")
