from flask import Blueprint, jsonify, request, url_for
from . import db
from .models import Incident, User, RoleEnum
from flask_login import login_required, current_user

bp = Blueprint('routes', __name__)

# Simple role check decorator
def roles_required(*roles):
    def decorator(f):
        from functools import wraps
        @wraps(f)
        def wrapped(*args, **kwargs):
            if not current_user.is_authenticated or current_user.role not in roles:
                return jsonify({"error": "forbidden"}), 403
            return f(*args, **kwargs)
        return wrapped
    return decorator

# HOME
@bp.route('/', methods=['GET'])
def index():
    return "🏠 IMS API is running. Use /api/... endpoints or run the React frontend at http://localhost:3000"

# API: list incidents
@bp.route('/api/incidents', methods=['GET'])
@login_required
def api_list_incidents():
    incidents = Incident.query.order_by(Incident.created_at.desc()).all()
    return jsonify([i.to_dict() for i in incidents]), 200

# API: create incident
@bp.route('/api/incidents', methods=['POST'])
@login_required
def api_create_incident():
    data = request.get_json() or request.form
    title = data.get('title')
    desc = data.get('description')
    priority = data.get('priority') or 'medium'
    if not title:
        return jsonify({"error": "title required"}), 400
    inc = Incident(title=title, description=desc, priority=priority, reporter_id=current_user.id)
    db.session.add(inc)
    db.session.commit()
    return jsonify(inc.to_dict()), 201

# API: incident detail
@bp.route('/api/incidents/<int:inc_id>', methods=['GET'])
@login_required
def api_incident_detail(inc_id):
    inc = Incident.query.get_or_404(inc_id)
    return jsonify(inc.to_dict()), 200

# API: assign incident (only admin/engineer)
@bp.route('/api/incidents/<int:inc_id>/assign', methods=['POST'])
@login_required
@roles_required(RoleEnum.ADMIN.value, RoleEnum.ENGINEER.value)
def api_assign(inc_id):
    data = request.get_json() or request.form
    assignee_id = data.get('assignee_id')
    inc = Incident.query.get_or_404(inc_id)
    user = User.query.get(assignee_id) if assignee_id else None
    inc.assignee = user
    db.session.commit()
    return jsonify(inc.to_dict()), 200

# API: resolve incident (admin/engineer/operator maybe allowed depending)
@bp.route('/api/incidents/<int:inc_id>/resolve', methods=['POST'])
@login_required
@roles_required(RoleEnum.ADMIN.value, RoleEnum.ENGINEER.value)
def api_resolve(inc_id):
    inc = Incident.query.get_or_404(inc_id)
    inc.status = 'resolved'
    db.session.commit()
    return jsonify(inc.to_dict()), 200

# API: get current user
@bp.route('/api/me', methods=['GET'])
def api_me():
    if not current_user.is_authenticated:
        return jsonify({"user": None}), 200
    return jsonify({"user": current_user.to_dict()}), 200
