from app import db

class Users(db.Model):
    id = db.Column('user_id', db.Integer, primary_key=True)
    username = db.Column(db.String(24))
    email = db.Column(db.String(64))
    pwd = db.Column(db.String(64))

    def __init__(self, username, email, pwd):
        self.username = username
        self.email = email
        self.pwd = pwd

    def __repr__(self):
        return "<User: Username - {}; email - {}; password - {};>".format(self.username, self.email, self.pwd)
