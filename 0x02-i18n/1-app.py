#!/usr/bin/env python3
"""1-app.py."""
from flask import Flask, render_template
from flask_babel import Babel


class Config:
    """Configure class languages."""

    LANGUAGES = ['en', 'fr']


app = Flask(__name__)
app.config['BABEL_DEFAULT_LOCALE'] = 'en'
app.config['BABEL_DEFAULT_TIMEZONE'] = 'UTC'

babel = Babel(app)
