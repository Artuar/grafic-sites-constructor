from google.cloud import datastore
import datetime


project_id='webgl-site-constructor'
client_instance=''


def create_client():
    global client_instance
    if client_instance=='':
        client_instance =  datastore.Client(project_id)

    return client_instance


def create_site(name, email, body):
    client=create_client()
    key = client.key('sites')
    date = datetime.datetime.utcnow()
    site = datastore.Entity(
        key, exclude_from_indexes=['id'])

    site.update({
        'created': date,
        'name': name,
        'email': email,
        'body': body,
        'is_public': False,
        'edited': date
    })

    client.put(site)
    site['id'] = site.key.id
    return site


def remove_site(email, siteid):
    client=create_client()
    with client.transaction():
        key = client.key('sites', siteid)
        site = client.get(key)

        if not site['email'] == email:
            raise ValueError(
                'User {} does not have access to site {}.'.format(email, siteid))

        client.delete(key)

        return siteid


def edit_site(email, siteid, name = None, is_public = None, body = None):
    client=create_client()
    with client.transaction():
        key = client.key('sites', siteid)
        site = client.get(key)

        if not site['email'] == email:
            raise ValueError(
                'User {} does not have access to site {}.'.format(email, siteid))

        if not name == None: 
            site['name'] = name

        if not body == None: 
            site['body'] = body

        if not is_public == None: 
            site['is_public'] = is_public

        site['edited'] = datetime.datetime.utcnow()

        client.put(site)
        site['id'] = site.key.id
        return site


def get_sites_by_email(email):
    client=create_client()
    query = client.query(kind='sites')
    query.add_filter('email', '=', email)
    sites = []

    print('get_sites_by_email')
    for site in query.fetch():
        site['id'] = site.key.id
        sites.append(site)

    return sites


def get_site(email, siteid):
    client=create_client()
    key = client.key('sites', siteid)
    site = client.get(key)
    site['id'] = site.key.id

    if not site['email'] == email:
        raise ValueError(
            'User {} does not have access to site {}.'.format(email, siteid))

    return site
