import re
from app import db, jwt
from app.auth import bp
from app.auth.helpers import getUsers, getUser, addUser, removeUser, delWeet
from app.models import Users, Weet, InvalidToken
from app.security import encpwd, checkpwd, enc, dec
from flask import request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity, get_jwt, \
    jwt_required


@jwt.token_in_blocklist_loader
def check_if_blacklisted_token(data, decrypted):
    """
    Decorator designed to check for blacklisted tokens
    """
    jti = decrypted['jti']
    return InvalidToken.is_invalid(jti)


@bp.route("/api/login", methods=["POST"])
def login():
    try:
        email = request.json["email"]
        pwd = request.json["pwd"]
        if email and pwd:
            user = list(filter(lambda x: dec(x["email"]) == email and checkpwd(pwd, x["pwd"]), getUsers()))
            if len(user) == 1:
                token = create_access_token(identity=user[0]["id"])
                refresh_token = create_refresh_token(identity=user[0]["id"])
                return jsonify({"token": token, "refreshToken": refresh_token})
            else:
                return jsonify({"error": "Invalid credentials"})
        else:           
            return jsonify({"error":"Invalid Form"})
    except:
        return jsonify({"error": "Invalid Form"})


@bp.route("/api/register", methods=["POST"])
def register():
    try:
        pwd = encpwd(request.json['pwd'])
        username = request.json['username']
        email = request.json["email"]
        email = email.lower()
        
        users = getUsers()
        if len(list(filter(lambda x: dec(x["email"]) == email, users))) == 1:         
            return jsonify({"error": "Invalid Form"})

        if not re.match(r"[\w\._]{5,}@\w{3,}.\w{2,4}", email):
            return jsonify({"error": "Invalid form"})
        # secure details validate username
        addUser(username, enc(email), pwd)
        return jsonify({"success": True})
    except:
        return jsonify({"error": "Invalid form"})


@bp.route("/api/checkiftokenexpire", methods=["POST"])
@jwt_required()
def check_if_token_expire():
    return jsonify({"success": True})


@bp.route("/api/refreshtoken", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    token = create_access_token(identity=identity)
    return jsonify({"token": token})


@bp.route("/api/logout/access", methods=["POST"])
@jwt_required()
def access_logout():
    jti = get_jwt()["jti"]
    try:
        invalid_token = InvalidToken(jti=jti)
        invalid_token.save()
        return jsonify({"success":True})
    except Exception as e:
        print(e)
        return jsonify({"error": e})


@bp.route("/api/logout/refresh", methods=["POST"])
@jwt_required()
def refresh_logout():
    jti = get_jwt()["jti"]
    try:
        invalid_token = InvalidToken(jti=jti)
        invalid_token.save()
        return jsonify({"success": True})
    except Exception as e:
        print(e)
        return jsonify({"error": e})


@bp.route("/api/getcurrentuser")
@jwt_required()
def current_user():
    uid = get_jwt_identity()
    return jsonify(getUser(uid))


@bp.route("/api/changepassword", methods=["POST"])
@jwt_required()
def change_password():
    try:
        user = Users.query.get(get_jwt_identity())
        if not (request.json["password"] and request.json["npassword"] and request.json["rpassword"]):
            return jsonify({"error": "Invalid form"})
        if not request.json["npassword"] == request.json["rpassword"]:
            return jsonify({"error": "New password and Repeat new password must be the same."})
        if not user.pwd == request.json["password"]:
            return jsonify({"error": "Wrong password"})
        
        user.pwd = request.json["npassword"]
        db.session.add(user)
        db.session.commit()
        return jsonify({"success": True})
    except Exception as e:
        print(e)
        return jsonify({"error": "Invalid Form"})


@bp.route("/api/deleteaccount", methods=["DELETE"])
@jwt_required()
def delete_account():
    try:
        user = Users.query.get(get_jwt_identity())
        weets = Weets.query.all()
        for weet in weets:
            if weet.user.username == user.username:
                delWeet(weet.id)
        removeUser(user.id)
        return jsonify({"success": True})
    except Exception as e:
        return jsonify({"error": str(e)})

