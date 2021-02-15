import re
from app import db
from app.main import bp
from app.main.helpers import getWeets, getUserWeets, addWeet, delWeet
from app.models import Users
from flask import request, jsonify


@bp.route("/api/weets")
def get_weets():
    return jsonify(getWeets())


@bp.route("/api/addweet", methods=["POST"])
def add_weet():
    try:
        title = request.json["title"]
        content = request.json["content"]
        uid = request.json["uid"]
        addWeet(title, content, uid)
        return jsonify({"success":"true"})
    except Exception as e:
        print(e)
        return jsonify({"error": "Invalid form"})


@bp.route("/api/deleteweet", methods=["DELETE"])
def delete_weet():
    try:
        wid = request.json["wid"]
        delWeet(wid)
        return jsonify({"success": "true"})
    except:
        return jsonify({"error": "Invalid form"})