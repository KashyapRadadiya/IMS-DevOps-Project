import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

class Config:
    # Secret key set in environment
    SECRET_KEY = os.environ.get('SECRET_KEY')

    # SQLite database
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')  or f"sqlite:///{BASE_DIR / 'ims.db'}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Flask-Mail settings (dev: use MailHog or an smtp server)
    MAIL_SERVER = os.environ.get('MAIL_SERVER')
    MAIL_PORT = int(os.environ.get('MAIL_PORT'))  # MailHog default
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    MAIL_DEFAULT_SENDER = os.environ.get('MAIL_DEFAULT_SENDER')