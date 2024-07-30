#!/usr/bin/env python3
"""2-app.py."""
from flask import Flask, request
from flask_babel import Babel


class Config:
    """Config class."""

    LANGUAGES = ['en', 'fr']


conf = Config()


@babel.localeselector
def get_locale():
    """Get locale of the user."""
    lan = request.accept_languages.best_match([config.LANGUAGES])
    return lan
