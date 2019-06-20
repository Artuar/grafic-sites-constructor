from flask import Flask, render_template, request
from src.database import add_user, block_user, get_user

import os
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/artuar1990/google-credentials.json"


app = Flask(__name__, template_folder='front')


@app.route('/')
def hello():
    """Return a friendly HTTP greeting."""

    return render_template('login.html')


@app.route('/add-user')
def adduser():
    """Add user to database."""
    name = request.args.get('name')
    email = request.args.get('email')
    user_id = add_user(name=name, email=email)

    return 'New user_id: ' + str(user_id)


@app.route('/block-user')
def blockuser():
    """Block user in database."""
    id = request.args.get('id')
    block_user(user_id=id)

    return 'User is bloked'


@app.route('/get-user')
def getuser():
    """Block user in database."""
    email = request.args.get('email')
    user = get_user(email=email)

    return 'Found user_id: ' + str(user.key.id)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
