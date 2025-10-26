from app import create_app, db
from app.models import User, Incident

app = create_app()
with app.app_context():
    # create sample users
    u1 = User(email='alice@kashu.com', name='Alice', role='admin')
    u2 = User(email='bob@kashu.com', name='Bob', role='engineer')
    db.session.add_all([u1, u2])
    db.session.commit()

    # create incidents
    inc1 = Incident(title='DB connection failure', description='Cannot reach DB', priority='high', reporter_id=u1.id)
    inc2 = Incident(title='Frontend 500 error', description='500 at /dashboard', priority='medium', reporter_id=u2.id)
    db.session.add_all([inc1, inc2])
    db.session.commit()
    print("Sample data created.")
