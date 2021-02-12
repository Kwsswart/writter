from app import db
from app.models import Users

def getUsers():
    users = Users.query.all()
    return [{"id": i.id, "username": i.username, "email": i.email, "pwd": i.pwd} for i in users]


def addUser(username, email, pwd):

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