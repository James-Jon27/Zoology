from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class MarbleForm(FlaskForm):
    title= StringField("title", validators=[DataRequired(), Length(0, 50)])
    story = StringField("story", validators=[DataRequired(), Length(0, 10000)])