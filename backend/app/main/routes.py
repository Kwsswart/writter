import re
from app import db
from app.main import bp
from app.models import Users
from app.main.helpers import getUsers, addUser, removeUser
from flask import request, jsonify


@bp.route("/api/login", methods=["POST"])
def login():
    try:
        req = request.json
        if req["email"] and req["pwd"]:
            users = getUsers()
            return jsonify(len(list(filter(lambda x: x["email"] == req["email"] and x["pwd"] == req["pwd"], users))) == 1)
        else:
            
            return jsonify({"error":"Invalid Form"})
    except:
        return jsonify({"error": "Invalid Form"})


@bp.route("/api/register", methods=["POST"])
def register():
    try:
        req = request.json
        email = req["email"]
        email = email.lower()
        users = getUsers()
        if len(list(filter(lambda x: x["email"] == email, users))) == 1:
            return jsonify({"error": "Invalid Form"})
        if not re.match(r"[\w\._]{5,}@\w{3,}.\w{2,4}", email): # Email validation
            return jsonify({"error": "Invalid form"})
        # secure details validate username
        addUser(req["username"], email, req["pwd"])
        return jsonify({"success": True})
    except:
        return jsonify({"error": "Invalid form"})