import time
from src.services.getuser import get_user_from_token
from src.components.database import get_sites_by_email, create_site


def add_site(request, methods=['POST']):
    user = get_user_from_token(request)
    name = request.form.get('name')
    email = request.form.get('email')
    body = request.form.get('body')
    if user:
        email = user['email']
        if email:
            sites_resp = create_site(name, email, body)
    
    return sites_resp
