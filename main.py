from flask import Flask, render_template, request, send_from_directory
from src.database import add_user, block_user, get_user
from src.oauth import verify_token

import os
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/artuar1990/google-credentials.json"


app = Flask(__name__, template_folder='static')


@app.route('/')
def hello():
    """Return a friendly HTTP greeting."""

    return render_template('index.html')


@app.route('/tokensignin', methods=["POST"])
def tokensignin():
    """Verify google token."""
    token = request.form['token']
    verify_token(token)
    return 'responce'


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


@app.route('/<path:path>')
def send_js(path):
    return send_from_directory('static', path)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
