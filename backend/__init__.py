from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail
from flask_login import LoginManager
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '.env'))  # loads variables from .env into os.environ

db = SQLAlchemy()
mail = Mail()
login_manager = LoginManager()
login_manager.login_view = 'auth.login'

def create_app():
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object('backend.config.Config')

    db.init_app(app)
    mail.init_app(app)
    login_manager.init_app(app)

    # Enable CORS for React dev server with credentials support
    CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

    # register blueprints
    from .auth import bp as auth_bp
    from .routes import bp as routes_bp
    app.register_blueprint(auth_bp, url_prefix='')
    app.register_blueprint(routes_bp, url_prefix='')

    # create database tables if not exist
    with app.app_context():
        db.create_all()

    return app