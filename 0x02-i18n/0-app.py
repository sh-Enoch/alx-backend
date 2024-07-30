#!/usr/bin/env python3
"""0-app.py."""
from flask import Flask, render_template


app = Flask(__name__)


@app.route("/")
@app.route("/index")
def index():
    """Entry to the root."""
    return render_template('0-index.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0')
