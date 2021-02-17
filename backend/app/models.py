from app import db


class Users(db.Model):
    """
    User database model
    """

    id = db.Column('user_id', db.Integer, primary_key=True)
    username = db.Column(db.String(24))
    email = db.Column(db.String(64))
    pwd = db.Column(db.String(64))

    weet = db.relationship('Weet', backref='users', lazy='dynamic')

    def __init__(self, username, email, pwd):
        self.username = username
        self.email = email
        self.pwd = pwd

    def __repr__(self):
        return "<User: Username - {}; email - {}; password - {};>".format(self.username, self.email, self.pwd)


class Weet(db.Model):
    """
    Weet database model
    """

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    user = db.relationship('Users', foreign_keys=user_id)
    title = db.Column(db.String(256))
    content = db.Column(db.String(2048))

    def __init__(self, user, title, content):
        self.user = user
        self.title = title
        self.content = content

    def __repr__(self):
        return "<Weet: User - {}; Title - {}; Content - {};>".format(self.user, self.title, self.content)


class InvalidToken(db.Model):
    """
    Blacklisted token storage
    """

    __tablename__ = "invalid_tokens"
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String)

    def save(self):
        db.session.add(self)
        db.session.commit()
    
    @classmethod
    def is_invalid(cls, jti):
        q = cls.query.filter_by(jti=jti).first()
        return bool(q)

