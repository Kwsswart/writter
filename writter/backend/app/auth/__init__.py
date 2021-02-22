from flask import Blueprint

bp = Blueprint('auth', __name__, static_folder='../../build', static_url_path='/')

from app.auth import routes