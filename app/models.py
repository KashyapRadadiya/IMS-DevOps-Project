from . import db
from datetime import datetime
from enum import Enum
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class RoleEnum(Enum):
    ADMIN = "admin"
    ENGINEER = "engineer"
    OPERATOR = "operator"

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(80))
    role = db.Column(db.String(20), default=RoleEnum.ENGINEER.value)
    password_hash = db.Column(db.String(128))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "role": self.role
        }

class Incident(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    status = db.Column(db.String(50), default='open') # open, assigned, resolved, closed
    priority = db.Column(db.String(20), default='medium') # low, medium, high
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    reporter_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    assignee_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    reporter = db.relationship('User', foreign_keys=[reporter_id], backref='reported')
    assignee = db.relationship('User', foreign_keys=[assignee_id], backref='assigned')

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "status": self.status,
            "priority": self.priority,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "reporter": self.reporter.to_dict() if self.reporter else None,
            "assignee": self.assignee.to_dict() if self.assignee else None
        }
