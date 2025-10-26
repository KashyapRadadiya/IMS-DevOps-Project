from flask import Blueprint, request, jsonify, current_app
from .models import User, RoleEnum
from . import db

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/create_user', methods=['POST'])
def create_user():
    data = request.get_json() or {}
    email = data.get('email')
    name = data.get('name', '')
    role = data.get('role', RoleEnum.ENGINEER.value)
    if not email:
        return jsonify({"error":"email required"}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({"error":"user exists"}), 400
    user = User(email=email, name=name, role=role)
    db.session.add(user)
    db.session.commit()
    return jsonify(user.to_dict()), 201
