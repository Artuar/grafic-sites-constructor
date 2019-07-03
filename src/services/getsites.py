import time
from src.services.getuser import get_user_from_token
from src.components.database import get_sites_by_email


def get_sites(request):
    sites_resp = '[]'
    user = get_user_from_token(request)
    if user:
        email = user['email']
        if email:
            sites_resp = get_sites_by_email(email)
    
    return sites_resp
