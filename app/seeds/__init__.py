from flask.cli import AppGroup

from app.seeds.saved_creatures import seed_saved_creatures, undo_saved_creatures

from .creatures import seed_creatures, undo_creatures
from .marbles import seed_lore, undo_lore
from .users import seed_users, undo_users

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_saved_creatures()
        undo_lore()
        undo_creatures()
        undo_users()
    seed_users()
    seed_creatures()
    seed_lore()
    seed_saved_creatures()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_saved_creatures()
    undo_lore()
    undo_creatures()
    undo_users()