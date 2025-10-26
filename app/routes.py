from flask import Blueprint, request, jsonify, current_app
from . import db, mail
from .models import Incident, User
from .email_utils import send_email_on_assign
from sqlalchemy.exc import SQLAlchemyError

bp = Blueprint('routes', __name__)

@bp.route('/')
def home():
    return "Welcome To IMS Home Page!🏠"

@bp.route('/incidents', methods=['POST'])
def create_incident():
    data = request.get_json() or {}
    title = data.get('title')
    if not title:
        return jsonify({"error":"title required"}), 400
    inc = Incident(
        title=title,
        description=data.get('description'),
        priority=data.get('priority', 'medium'),
        reporter_id=data.get('reporter_id')
    )
    db.session.add(inc)
    db.session.commit()
    return jsonify(inc.to_dict()), 201

@bp.route('/incidents', methods=['GET'])
def list_incidents():
    incidents = Incident.query.order_by(Incident.created_at.desc()).all()
    return jsonify([i.to_dict() for i in incidents]), 200

@bp.route('/incidents/<int:inc_id>', methods=['GET'])
def get_incident(inc_id):
    inc = Incident.query.get_or_404(inc_id)
    return jsonify(inc.to_dict())

@bp.route('/incidents/<int:inc_id>', methods=['PUT'])
def update_incident(inc_id):
    inc = Incident.query.get_or_404(inc_id)
    data = request.get_json() or {}
    # allowed updates
    for field in ['title','description','status','priority']:
        if field in data:
            setattr(inc, field, data[field])
    # assign/unassign
    if 'assignee_id' in data:
        assignee_id = data['assignee_id']
        inc.assignee_id = assignee_id
        # send email when assigned
        if assignee_id:
            send_email_on_assign(inc)
    try:
        db.session.commit()
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    return jsonify(inc.to_dict()), 200

@bp.route('/incidents/<int:inc_id>/resolve', methods=['POST'])
def resolve_incident(inc_id):
    inc = Incident.query.get_or_404(inc_id)
    inc.status = 'resolved'
    db.session.commit()
    return jsonify(inc.to_dict()), 200
