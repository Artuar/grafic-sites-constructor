import time
from src.services.getuser import get_user_from_token
from src.components.database import get_sites_by_email, edit_site


def change_site(request, siteid):
    user = get_user_from_token(request)
    name = request.form.get('name')
    body = request.form.get('body')
    is_public = request.form.get('is_public')
    if user:
        email = user['email']
        if email:
            resp = edit_site(email, siteid, name, is_public, body)
    
    return resp
