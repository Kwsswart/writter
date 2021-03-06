import os
import logging
from logging.handlers import SMTPHandler, RotatingFileHandler
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from config import Config
    

cors = CORS()
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app(config_class=Config):
    """ Create application context """

    app = Flask(__name__, static_folder="../build", static_url_path="/")
    app.config.from_object(Config)

    db.init_app(app)
    cors.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    from app.main import bp as main_bp
    app.register_blueprint(main_bp)

    from app.auth import bp as auth_bp
    app.register_blueprint(auth_bp)


    if not app.debug and not app.testing:
        if app.config['MAIL_SERVER']:
            auth = None
            if app.config['MAIL_USERNAME'] or app.config['MAIL_PASSWORD']:
                auth = (app.config['MAIL_USERNAME'], app.config['MAIL_PASSWORD'])
            secure = None
            if app.config['MAIL_USE_TLS']:
                secure = ()
            mail_handler = SMTPHandler(
                mailhost=(app.config['MAIL_SERVER'], app.config['MAIL_PORT']),
                fromaddr='no-reply@' + app.config['MAIL_SERVER'],
                toaddrs=app.config['ADMINS'], subject='Microblog Failure',
                credentials=auth, secure=secure)
            mail_handler.setLevel(logging.ERROR)
            app.logger.addHandler(mail_handler)

        # file based logger    
        if app.config['LOG_TO_STDOUT']:
            stream_handler = logging.StreamHandler()
            stream_handler.setLevel(logging.INFO)
            app.logger.addHandler(stream_handler)
        else:
            if not os.path.exists('logs'):
                os.mkdir('logs')
            file_handler = RotatingFileHandler('logs/writter.log', maxBytes=10240, backupCount=10)
            file_handler.setFormatter(logging.Formatter(
                '€(asctime)s €(levelname)s: €(message)s [in €pathnames:%(lineno)d]'))
            file_handler.setLevel(logging.INFO)
            app.logger.addHandler(file_handler)
    
        app.logger.setLevel(logging.INFO)
        app.logger.info('Writter startup')
                    
    return app


from app import models