#  AI DevOps Agent
An AI-powered DevOps automation system that analyzes CI/CD pipeline failures, explains errors, and suggests fixes using Generative AI and Agentic AI concepts.

#  Project Overview
Modern CI/CD pipelines generate large logs when builds or deployments fail. Debugging these logs manually is time-consuming and difficult.
This project solves that problem by using AI to:

* Analyze CI/CD logs
* Detect errors automatically
* Explain root causes
* Suggest fixes
* Fetch GitHub Actions workflow logs dynamically
* Provide a professional dashboard interface
* 
The system uses FastAPI, React, Docker, GitHub Actions, and Groq LLM APIs.


#  Key Features

##  AI-Based Log Analysis
* Detects CI/CD pipeline failures
* Explains errors in simple language
* Suggests possible fixes

##  Agentic AI Workflow
The system uses a multi-step AI workflow:
* Analyzer Agent
* Fixer Agent
* Validator Agent

##  GitHub Actions Integration
* Fetch latest workflow logs
* Analyze failed pipeline runs
* Dynamic repository support

##  Secure GitHub Authentication
* User provides GitHub Personal Access Token
* No permanent token storage
* Secure API-based access

##  Modern React Dashboard
* Dark theme UI
* Real-time analysis
* GitHub integration panel
* Structured AI output cards

##  Dockerized Architecture
* Backend containerized
* Frontend containerized
* Docker Compose support
* One-command startup

#  System Architecture

```text
GitHub Actions
      ↓
Workflow Logs
      ↓
FastAPI Backend
      ↓
Agentic AI Layer
      ↓
Groq LLM API
      ↓
Analysis + Fix Suggestion
      ↓
React Dashboard
```

---

#  Tech Stack

| Category         | Technology              |
| ---------------- | ----------------------- |
| Backend          | FastAPI                 |
| Frontend         | React                   |
| AI Model         | LLaMA 3.3 70B Versatile |
| LLM Provider     | Groq                    |
| CI/CD            | GitHub Actions          |
| Containerization | Docker                  |
| APIs             | GitHub REST API         |
| AI Workflow      | Manual Agentic System   |

---

#  Project Structure

```text
ai-devops-agent/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── main.py
│   │
│   ├── Dockerfile
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   │
│   ├── Dockerfile
│   ├── package.json
│   └── .dockerignore
│
├── docker-compose.yml
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️ Clone Repository
```bash
git clone <your-repo-url>
cd ai-devops-agent
```

---

#  Environment Variables
## Backend `.env`

```env
GROQ_API_KEY=your_groq_api_key
```

---

#  Run Using Docker
## Build and Start Containers

```bash
docker compose up --build
```

---

#  Application URLs
## Frontend

```text
http://localhost:3000
```

## Backend API Docs
```text
http://localhost:8000/docs
```

#  GitHub Token Setup
To fetch GitHub Actions logs:

1. Open GitHub Settings
2. Go to Developer Settings
3. Create Personal Access Token
4. Enable permissions:

   * repo
   * workflow

Paste the token in the dashboard UI.



#  Example Workflow

## Example Error

```text
ModuleNotFoundError: No module named 'requests'
```

## AI Output

### Error Analysis

The requests package is missing from the Python environment.

### Suggested Fix

```bash
pip install requests
```

### Validation

Installing the missing package resolves the error.


#  Security Design
For security reasons, the system does not execute commands directly on user systems.

Instead, it provides:

* Safe fix suggestions
* Explainable AI responses
* Controlled GitHub API integration


#  Future Enhancements

* AWS Cloud Deployment
* Kubernetes Support
* Jenkins Integration
* Slack Notifications
* Auto Pull Request Creation
* Multi-LLM Support


#  Screenshots

## Dashboard UI

(Add screenshot here)

## GitHub Logs Integration

(Add screenshot here)

## AI Analysis Panel

(Add screenshot here)


#  Author

Developed as a Final Year Major Project.

---

# 📜 License

This project is for educational and academic purposes.
