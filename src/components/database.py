from google.cloud import datastore
import datetime


project_id='webgl-site-constructor'
client_instance=''


def create_client():
    global client_instance
    if client_instance=='':
        client_instance =  datastore.Client(project_id)

    return client_instance


def create_site(name, email, body={}):
    client=create_client()
    key = client.key('sites')

    site = datastore.Entity(
        key, exclude_from_indexes=['id'])

    site.update({
        'created': datetime.datetime.utcnow(),
        'name': name,
        'email': email,
        'body': body,
    })

    client.put(site)

    return site.key.id


def block_user(user_id):
    client=create_client()
    with client.transaction():
        key = client.key('users', int(user_id))
        user = client.get(key)

        if not user:
            raise ValueError(
                'User {} does not exist.'.format(user_id))

        user['active'] = False

        client.put(user)


def get_sites_by_email(email):
    client=create_client()
    query = client.query(kind='sites')
    query.add_filter('email', '=', email)
    sites = []

    print('get_sites_by_email')
    for site in query.fetch():
        sites.append(site)

        
    # if len(sites) < 1:
    #     raise ValueError(
    #         'User is not found. Email: {}'.format(email))
    
    # if len(sites) > 1:
    #     raise ValueError(
    #         'More than one user is found. Email: {}'.format(email))

    return sites
