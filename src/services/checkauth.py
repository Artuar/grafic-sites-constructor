import time
from flask import jsonify
from src.components.oauth import verify_token

GOOGLE_AUTH_COOKIE = 'googleAuthToken'

def check_authorisation(request):
    responce = False
    if GOOGLE_AUTH_COOKIE in request.cookies:
        authtoken = request.cookies.get(GOOGLE_AUTH_COOKIE)
        idinto = verify_token(authtoken)
        if idinto:
            isvalid = time.time() < idinto['exp']
            if isvalid:
                responce = True
    return jsonify(auth=responce)
