from flask import Blueprint, request, jsonify, url_for, redirect, flash, render_template
from . import db, login_manager
from .models import User, RoleEnum
from flask_login import login_user, logout_user, login_required, current_user

bp = Blueprint('auth', __name__, template_folder='templates')

@bp.route('/login', methods=['GET'])
def login_page():
    return render_template('login.html') if 'templates' in bp.root_path else ('', 204)

@bp.route('/register', methods=['GET'])
def register_page():
    return render_template('register.html') if 'templates' in bp.root_path else ('', 204)

# API: JSON login
@bp.route('/api/login', methods=['POST'])
def api_login():
    data = request.get_json() or request.form
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400
    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        login_user(user)
        return jsonify({"message": "Logged in", "user": user.to_dict()}), 200
    return jsonify({"error": "Invalid credentials"}), 401

# API: JSON logout
@bp.route('/api/logout', methods=['POST'])
@login_required
def api_logout():
    logout_user()
    return jsonify({"message": "Logged out"}), 200

# API: register
@bp.route('/api/register', methods=['POST'])
def api_register():
    data = request.get_json() or request.form
    email = data.get('email')
    name = data.get('name')
    password = data.get('password')
    role = data.get('role') or RoleEnum.ENGINEER.value
    if not email or not password or not name:
        return jsonify({"error": "name, email and password required"}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already registered"}), 400
    u = User(email=email, name=name, role=role)
    u.set_password(password)
    db.session.add(u)
    db.session.commit()
    return jsonify({"message": "User created", "user": u.to_dict()}), 201

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))
