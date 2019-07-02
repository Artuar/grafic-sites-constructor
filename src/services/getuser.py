import time
from src.components.oauth import verify_token

GOOGLE_AUTH_COOKIE = 'googleAuthToken'

def get_user_from_token(request):
    user_resp = {}
    if GOOGLE_AUTH_COOKIE in request.cookies:
        authtoken = request.cookies.get(GOOGLE_AUTH_COOKIE)
        user_resp = verify_token(authtoken)
    return user_resp
