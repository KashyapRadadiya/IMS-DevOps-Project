# 💻🌍Open-Source Incident Management System (IMS) - Flask,Devops♾️
is a full-stack project to streamline incident management with a React frontend, Flask backend, SQLite database, and email notifications. The project is fully Dockerized for easy deployment and local testing.

 Its IMS to log, track, assign, and resolve infra/app incidents with role-based access.

---

## 📌 Features

- 👤 User authentication & role-based access  
- 📝 Incident reporting & tracking  
- 📧 Email notifications
- 🌐 React frontend with dynamic API calls  
- 🗄 SQLite database  
- ⚙️ Configurable via `.env`  

---

## 💻 Tech Stack

- **Frontend:** React.js, HTML, CSS, JavaScript  
- **Backend:** Python, Flask, Flask-SQLAlchemy  
- **Database:** SQLite (dev), can upgrade to PostgreSQL/MySQL  
- **Email Testing:** MailHog (SMTP server for local testing)  
- **Containerization:** Docker & Docker Compose  

---

## ⚡ Prerequisites

- Docker & Docker Compose  
- Python 3.11 
- Node.js & npm (frontend)  

---

## 🔑 Environment Variables

Create .env in backend/:
```bash
FLASK_APP=app
FLASK_ENV=development
DATABASE_URL=sqlite:///ims.db
SECRET_KEY=dev-secret
MAIL_SERVER=mailhog
MAIL_PORT=1025
MAIL_DEFAULT_SENDER=ims@kashu.com
MAIL_USERNAME=
MAIL_PASSWORD=
```
Docker will load these automatically.

---

## 🐳 Docker Usage

#### 1️⃣ Build & Start
```bash
docker-compose up --build
```
#### 2️⃣ Access Services
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/
- MailHog UI: http://localhost:8025


#### 3️⃣ Stop Containers
```bash
docker-compose down
```
---

## 🚀 Setup & Installation (Locally)

#### 1️⃣ Clone Repo
```bash
git clone https://github.com/KashyapRadadiya/IMS-DevOps-Project.git
cd root_project
```
#### 2️⃣ Backend (Python + Flask)
```bash
cd backend
pip install -r requirements.txt
cd root_project
python -m backend.wsgi
```
#### 3️⃣ Frontend (React)
```bash
cd frontend
npm install
npm start
```
---

