from flask import current_app
from flask_mail import Message
from . import mail

def send_email_on_assign(incident):
    if not incident.assignee or not incident.assignee.email:
        return
    subject = f"[IMS] Assigned incident #{incident.id}: {incident.title}"
    body = f"Hello {incident.assignee.name or incident.assignee.email},\n\nYou have been assigned incident #{incident.id}.\n\nTitle: {incident.title}\nDescription: {incident.description}\n\nLink: (add your UI link here)\n\nRegards,\nIMS"
    msg = Message(subject=subject, recipients=[incident.assignee.email], body=body)
    try:
        mail.send(msg)
    except Exception as e:
        current_app.logger.error("Failed to send email: %s", e)
