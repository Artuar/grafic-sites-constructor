import time
from src.services.getuser import get_user_from_token
from src.components.database import get_sites_by_email, remove_site


def delete_site(request, siteid):
    user = get_user_from_token(request)
    if user:
        email = user['email']
        if email:
            sites_resp = remove_site(email, siteid)
    
    return sites_resp
