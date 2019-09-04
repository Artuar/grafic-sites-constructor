import time
from src.services.getuser import get_user_from_token
from src.components.database import get_sites_by_email, get_site


def get_sites(request):
    sites_resp = '[]'
    user = get_user_from_token(request)
    if user:
        email = user['email']
        if email:
            sites_resp = get_sites_by_email(email)
    
    return sites_resp


def get_site_by_id(request, id):
    sites_resp = ''
    user = get_user_from_token(request)
    if user:
        email = user['email']
        if email:
            sites_resp = get_site(email, id)
    
    return sites_resp
