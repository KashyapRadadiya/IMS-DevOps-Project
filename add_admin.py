# create admin quickly
from app import create_app, db
from app.models import User, RoleEnum
app = create_app()
with app.app_context():
    if not User.query.filter_by(email='admin@admin.com').first():
        u = User(email='admin@admin.com', name='AdminKashyap', role=RoleEnum.ADMIN.value)
        u.set_password('kashyapadmin')
        db.session.add(u)
        db.session.commit()
        print("Admin created")
