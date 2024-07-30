#!/usr/bin/env python3
"""1-app.py."""
from fask import Flask, render_template
from flask_babel import Babel


class Config:
    """Configure class languages."""

    LANGUAGES = ['en', 'fr']


app = Flask(__name__)

babel = Babel(app, locale_selector='en', timezoneselector='UTC')


@app.route("/")
@app.route("/index")
def index():
    """Entry to the root."""
    return render_template('1-index.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0')
