from app import db
from app.models import Users


def getUsers():
    """
    Function intended to query database for all users
    """

    users = Users.query.all()
    return [{"id": i.id, "username": i.username, "email": i.email, "pwd": i.pwd} for i in users]


def getUser(uid):
    """
    Function intended to query database for user by id
    """

    users = Users.query.all()
    user = list(filter(lambda x: x.id == uid, users))[0]
    return {"id": user.id, "username": user.username, "email": user.email, "pwd": user.pwd}


def addUser(username, email, pwd):
    """
    Function intended to add users, pass variables with values not values themselves
    """

    if username and pwd and email:
        try:
            user = Users(username, email, pwd)
            db.session.add(user)
            db.session.commit()
            return True
        except Exception as e:
            print(e)
            return False
    else:
        return False


def removeUser(user_id):
    """
    Function intended to remove users
    """

    if user_id:
        try:
            user = Users.query.get(user_id)
            db.session.delete(user)
            db.session.commit()
            return True
        except Exception as e:
            print(e)
            return False
    else:
        return False