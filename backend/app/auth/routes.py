import re
from app import db
from app.auth import bp
from app.models import Users
from app.auth.helpers import getUsers, addUser, removeUser
from flask import request, jsonify


@bp.route("/api/login", methods=["POST"])
def login():
    try:
        email = request.json["email"]
        pwd = request.json["pwd"]
        if email and pwd:
            users = getUsers()
            return jsonify(len(list(filter(lambda x: x["email"] == email and x["pwd"] == pwd, users))) == 1)
        else:
            print('Hi am here')            
            return jsonify({"error":"Invalid Form"})
    except:
        return jsonify({"error": "Invalid Form"})


@bp.route("/api/register", methods=["POST"])
def register():
    try:
        req = request.json
        pwd = request.json['pwd']
        username = request.json['username']
        email = request.json["email"]
        email = email.lower()
        users = getUsers()
        if len(list(filter(lambda x: x["email"] == email, users))) == 1:
            return jsonify({"error": "Invalid Form"})
        if not re.match(r"[\w\._]{5,}@\w{3,}.\w{2,4}", email): # Email validation
            return jsonify({"error": "Invalid form"})
        # secure details validate username
        addUser(username, email, pwd)
        return jsonify({"success": True})
    except:
        return jsonify({"error": "Invalid form"})