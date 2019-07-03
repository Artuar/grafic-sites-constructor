from flask import Flask, render_template, request, send_from_directory, jsonify
from src.components.database import block_user
from src.services.checkauth import check_authorisation
from src.services.getuser import get_user_from_token
from src.services.getsites import get_sites
from src.services.addsite import add_site


import os
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/artuar1990/google-credentials.json"


app = Flask(__name__, template_folder='static')


@app.route('/checkauth', methods=["GET"])
def checkauth():
    return check_authorisation(request)


@app.route('/getuser', methods=["GET"])
def getuserfromtoken():
    return jsonify(get_user_from_token(request))


@app.route('/getsites', methods=["GET"])
def getsites():
    return jsonify(get_sites(request))


@app.route('/addsite')
def adduser():
    return jsonify(add_site(request))


@app.route('/block-user')
def blockuser():
    """Block user in database."""
    id = request.args.get('id')
    block_user(user_id=id)

    return 'User is bloked'


@app.route('/static/<path:path>')
def send_js(path):
    return send_from_directory('static', path)


@app.route('/')
def start():
    return render_template('index.html')


@app.route('/<path:path>')
def any(path):
    return render_template('index.html')


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
