from google.cloud import datastore
import datetime


project_id='webgl-site-constructor'
client_instance=''


def create_client():
    global client_instance
    if client_instance=='':
        client_instance =  datastore.Client(project_id)

    return client_instance


def add_user(name, email):
    client=create_client()
    key = client.key('users')

    users = datastore.Entity(
        key, exclude_from_indexes=['name'])

    users.update({
        'created': datetime.datetime.utcnow(),
        'name': name,
        'email': email,
        'active': True
    })

    client.put(users)

    return users.key.id


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


def get_user(email):
    client=create_client()
    query = client.query(kind='users')
    query.add_filter('email', '=', email)
    users = []

    for user in query.fetch():
        users.append(user)

        
    if len(users) < 1:
        raise ValueError(
            'User is not found. Email: {}'.format(email))
    
    if len(users) > 1:
        raise ValueError(
            'More than one user is found. Email: {}'.format(email))

    return users[0]
