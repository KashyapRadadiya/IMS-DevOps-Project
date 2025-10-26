from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail

from dotenv import load_dotenv
load_dotenv()  # loads variables from .env into os.environ

db = SQLAlchemy()
mail = Mail()

def create_app():
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object('app.config.Config')

    db.init_app(app)
    mail.init_app(app)

    with app.app_context():
        # lazy import routes to register blueprints
        from . import routes, auth
        app.register_blueprint(routes.bp)
        app.register_blueprint(auth.bp)
        db.create_all()  # creates sqlite file/tables if not exist

    return app