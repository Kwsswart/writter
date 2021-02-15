from app import db
from app.models import Weet, Users
from app.auth.helpers import getUser


def getWeets():
    """
    Function intended to query database for all weets
    """

    weets = Weet.query.all()
    return [{"id": i.id, "title": i.title, "content": i.content, "user": getUser(i.user_id)} for i in weets]


def getUserWeets(uid):
    """
    Function intended to query database for all user weets
    """

    weets = Weet.query.all()
    return [
        {"id": weet.id, "userid":  weet.user_id, "title": weet.title, "content": weet.content} for weet in filter(lambda i: i.user_id == uid, weets)
    ]


def delWeet(wid):
    """
    Function intended  to delete single weets
    """

    try:
        weet = Weet.query.get(wid)
        db.session.delete(weet)
        db.session.commit()
        return True
    except Exception as e:
        print(e)
        return False


def addWeet(title, content, uid):
    """
    Function intended to add weet to database.
        **args = variables
    """

    if title and content and uid:
        try:
            user = list(filter(lambda i: i.id == uid, Users.query.all()))[0]
            weet = Weet(title=title, content=content, user=user)
            db.session.add(weet)
            db.session.commit()
            return True
        except Exception as e:
            print(e)
            return False
    else:
        return False
