# 💻🌍Open-Source Incident Management System (IMS) - Flask,Devops♾️

## 👨🏻‍💻Objective
Basic IMS to log, track, assign, and resolve infra/app incidents with role-based access.

## 🛠️Stack
- Backend: Python + Flask
- DB: SQLite
- Email: SMTP (MailHog for dev)
- Containerization: Docker, docker-compose
- Version control: Git + GitHub

## ⚙️Quickstart (dev)
1. Clone repo
2. Create venv & install: `pip install -r requirements.txt`
3. Run sample data: `python sample_data.py`
4. Start: `python run.py`
5. Use curl or Postman to hit endpoints

## </>Endpoints
- `POST /incidents` create
- `GET /incidents` list
- `PUT /incidents/<id>` update/assign
- `POST /incidents/<id>/resolve` resolve
