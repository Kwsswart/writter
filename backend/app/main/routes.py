from app import db
from app.main import bp
from app.models import Users
from flask import request, jsonify


@bp.route("/api/users", methods=["GET", "POST", "DELETE"])
def users():
    if request.method == "GET":
        users = Users.query.all()
        return jsonify([{"id": i.id, "username": i.username, "email": i.email, "password": i.pwd} for i in users]), 200
    elif request.method == "POST":
        try:
            req = request.json 
            if req["username"] and req["pwd"] and req["email"]:
                try:
                    user = Users(req["username"],req["email"],req["pwd"])
                    db.session.add(user)
                    db.session.commit()
                    return jsonify({"sucess": True})
                except Exception as e:
                    return jsonify({"error": e})
            else:
                return jsonify({"error": "Invalid form"})
        except:
            return jsonify({"error": "Invalid form"})
    elif request.method == "DELETE":
        try:
            req = request.json
            if req["id"]:
                try:
                    user = Users.query.get(req["id"])
                    db.session.delete(user)
                    db.session.commit()
                    return jsonify({"success": True})
                except Exception as e:
                    return jsonify({"error": e})
            else:
                return jsonify({"error": "Invalid form"})
        except:
            return jsonify({"error": "m"})
