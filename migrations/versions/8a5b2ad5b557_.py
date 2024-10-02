"""empty message

Revision ID: 8a5b2ad5b557
Revises: 
Create Date: 2024-10-02 13:57:41.101891

"""
from alembic import op
import sqlalchemy as sa
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = '8a5b2ad5b557'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('first_name', sa.String(length=50), nullable=False),
    sa.Column('last_name', sa.String(length=50), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")

    op.create_table('creatures',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('image', sa.String(length=500), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('category', sa.String(), nullable=False),
    sa.Column('description', sa.String(length=350), nullable=False),
    sa.Column('origin', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE creatures SET SCHEMA {SCHEMA};")

    op.create_table('lore',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('creature_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=50), nullable=False),
    sa.Column('story', sa.String(length=10000), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['creature_id'], ['creatures.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE lore SET SCHEMA {SCHEMA};")

    op.create_table('saved_creatures',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('creature_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['creature_id'], ['creatures.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'creature_id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE saved_creatures SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('saved_creatures')
    op.drop_table('lore')
    op.drop_table('creatures')
    op.drop_table('users')
    # ### end Alembic commands ###
