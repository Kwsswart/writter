import re
from app import db
from app.main import bp
from app.main.helpers import getWeets, getUserWeets, addWeet, delWeet
from app.models import Users, Weet
from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity


@bp.route("/")
def react_index():
    return bp.send_static_file("index.html")


@bp.route("/<a>")
def react_route(a):
    return bp.send_static_file("index.html")
    

@bp.route("/api/weets")
def get_weets():
    return jsonify(getWeets())


@bp.route("/api/addweet", methods=["POST"])
@jwt_required()
def add_weet():
    try:
        title = request.json["title"]
        content = request.json["content"]
        if not (title and content):
            return jsonify({"error": "Invalid form"})
        uid = get_jwt_identity()
        addWeet(title, content, uid)
        return jsonify({"success":"true"})
    except Exception as e:
        print(e)
        return jsonify({"error": "Invalid form"})


@bp.route("/api/deleteweet/<wid>", methods=["DELETE"])
@jwt_required()
def delete_weet(wid):
    try:
        delWeet(wid)
        return jsonify({"success": "true"})
    except:
        return jsonify({"error": "Invalid form"})