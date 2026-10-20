# 2023-27-MAIN-A5-AccessGuard

# 🛡️ AccessGuard

### Design and Implementation of a Scalable Role-Based Access Control (RBAC) Framework for Enterprise Web Applications

![Status](https://img.shields.io/badge/status-in%20development-orange)
![Domain](https://img.shields.io/badge/domain-cybersecurity-blue)
![SDG](https://img.shields.io/badge/SDG-9%20Industry%2C%20Innovation%20%26%20Infrastructure-orange)
![License](https://img.shields.io/badge/license-MIT-green)

> A secure, flexible and scalable authorization framework that combines **RBAC** and **ABAC** with **Open Policy Agent (OPA)** and **AI-based anomaly detection** to deliver context-aware access control for enterprise web applications.

**Vidya Academy of Science & Technology** · Department of Computer Science and Engineering
Main Project · S7 CSE · Batch A · Group A5 · Academic Year 2026–2027

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [User Roles](#-user-roles)
- [Use Cases](#-use-cases)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Roadmap](#-roadmap)
- [Literature Background](#-literature-background)
- [SDG Alignment](#-sdg-alignment)
- [Team](#-team)
- [License](#-license)

---

## 📖 Overview

Enterprise web applications handle sensitive organizational data and are exposed to unauthorized access, insider threats and privilege misuse. Traditional RBAC depends only on predefined roles and lacks the flexibility needed in dynamic environments.

**AccessGuard** addresses this by integrating **Role-Based Access Control (RBAC)** with **Attribute-Based Access Control (ABAC)**. Every access request is evaluated against the user's role *and* contextual attributes such as:

- 🏢 Department
- 🕒 Access time
- 💻 Device trust
- 🔐 Resource sensitivity
- 📍 Location and network safety

Policies are managed centrally through **Open Policy Agent (OPA)**, while an **AI anomaly detection module** and **audit logging** provide continuous monitoring.

**Main goal:** provide secure, flexible and scalable access control for enterprise web applications.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| **Centralized authentication** | Keycloak with secure JWT-based authentication and Single Sign-On (SSO) |
| **Hybrid RBAC + ABAC** | Fine-grained, context-aware authorization decisions |
| **Policy-as-code** | Centralized policy management and enforcement through OPA |
| **Context evaluation** | Checks for location, device trust, time and network safety |
| **Temporary privilege elevation** | Time-bound elevated access with administrator approval, enforcing least privilege |
| **Account lockout** | Protection against brute-force attacks |
| **Audit logging** | Full records of time, location, device and action for every access |
| **AI anomaly detection** | Learns normal behaviour, scores risk, flags suspicious activity and can block access or request re-verification |
| **Compliance reporting** | Reports and incident investigation for auditors and security admins |

---

## 🏗️ System Architecture

```mermaid
flowchart LR
    U[Users<br/>Admin · Employee/Officer · Auditor] --> A[Authentication & Login<br/>Keycloak · JWT · MFA · SSO]
    A --> RA

    subgraph CORE [AccessGuard Core Modules]
        direction LR
        RA[1. Role Assignment Engine] --> CE[2. Context Evaluator]
        CE --> PDP[3. Policy Decision Point<br/>OPA]
        PDP --> PEP[4. Policy Enforcement Point]
    end

    PEP --> R[(Protected ERP Resources<br/>Finance · HR · Logistics · Inventory)]
    PDP -.-> M[5. Monitoring & Auditing]
    PEP <-.-> AI[6. AI Anomaly Detection]
    M <-.-> AI
    AI -.-> R
    M --> SA[Security Admin / Auditor]
```

### Core modules

1. **Role Assignment Engine** – manages roles, enforces least privilege and handles temporary privilege elevation during emergencies.
2. **Context Evaluator** – performs location, device-trust, time and network-safety checks.
3. **Policy Decision Point (PDP)** – evaluates policies, combines role and context, and returns an *Allow / Deny* decision.
4. **Policy Enforcement Point (PEP)** – intercepts requests and enforces the PDP's decision.
5. **Monitoring & Auditing Module** – audit logs, activity tracking and compliance reporting.
6. **AI Anomaly Detection Module** – learns normal behaviour, detects unusual activity, assigns risk scores, blocks access or requests verification, and alerts the security team.

---

## 👥 User Roles

| Role | Responsibilities |
|---|---|
| **Administrator** | Manage roles and permissions, configure access policies, approve temporary privilege elevation |
| **Employee / Officer** | Request and access ERP resources, request temporary elevation, view own access history |
| **Auditor / Security Admin** | View audit logs, investigate incidents, respond to alerts, generate compliance reports |

---

## 🎯 Use Cases

- Login with identity verification, MFA and session management
- Request access to an ERP resource and undergo context evaluation (location, device, time)
- View access result (Allow / Deny) and own access history
- Request / grant temporary privilege elevation
- Manage roles and permissions
- Configure and update access policies
- View audit logs and investigate security incidents
- Respond to security alerts and take action
- Generate and view compliance reports

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Backend | NestJS **or** FastAPI |
| Database | PostgreSQL |
| Cache / Sessions | Redis |
| Identity & SSO | Keycloak (JWT) |
| Policy Engine | Open Policy Agent (OPA) |
| AI / ML | Python |
| Logging & Monitoring | ELK Stack (Elasticsearch, Logstash, Kibana) |

---

## 📁 Project Structure

> Proposed layout – update as the project evolves.

```
accessguard/
├── frontend/              # React.js web client
├── backend/               # NestJS / FastAPI services (PEP, APIs)
├── policies/              # OPA policies (Rego) and test data
├── anomaly-detection/     # Python ML module
├── keycloak/              # Realm configuration and exports
├── elk/                   # Logstash pipelines, Kibana dashboards
├── docker-compose.yml     # Local development stack
├── docs/                  # Diagrams, reports, presentations
└── README.md
```

---

## 🚀 Getting Started

> ⚠️ The project is under active development. Setup steps below are a template – adjust them to match your implementation.

### Prerequisites

- Node.js ≥ 18
- Python ≥ 3.10
- Docker & Docker Compose
- PostgreSQL and Redis (or use the Docker stack)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/accessguard.git
cd accessguard

# 2. Start infrastructure (Keycloak, OPA, PostgreSQL, Redis, ELK)
docker-compose up -d

# 3. Start the backend
cd backend
npm install        # or: pip install -r requirements.txt (FastAPI)
npm run start:dev  # or: uvicorn main:app --reload

# 4. Start the frontend
cd ../frontend
npm install
npm start

# 5. Start the anomaly detection service
cd ../anomaly-detection
pip install -r requirements.txt
python main.py
```

### Configuration

Create a `.env` file in each service folder, for example:

```env
KEYCLOAK_URL=http://localhost:8080
KEYCLOAK_REALM=accessguard
OPA_URL=http://localhost:8181
DATABASE_URL=postgresql://user:password@localhost:5432/accessguard
REDIS_URL=redis://localhost:6379
```

---

## 🗺️ Roadmap

- [x] Problem definition and literature review
- [x] System architecture and use case design
- [ ] Keycloak authentication, JWT and SSO integration
- [ ] RBAC + ABAC policies in OPA
- [ ] Context evaluator (device, time, location)
- [ ] Temporary privilege elevation with admin approval
- [ ] Account lockout mechanism
- [ ] Audit logging with ELK Stack
- [ ] AI anomaly detection module
- [ ] Admin / auditor dashboards
- [ ] Testing, evaluation and documentation

---

## 📚 Literature Background

| Paper | Focus | Key Finding |
|---|---|---|
| Adaptive RBAC and Policy Enforcement in ERP Systems for Governmental and Military Applications (2025) | Adaptive, context-aware RBAC | Uses time, location, device status and user activity for dynamic decisions |
| Real-Time Adaptive Access Control (RTAAC) (2024) | Least privilege and Just-In-Time access | Temporary, context-based access reduces excessive privileges |
| RBAC Architecture for Enterprise Compliance Portal Systems (2024) | Enterprise RBAC and role engineering | Addresses role explosion, role decomposition, contextual authorization and audit logging |

---

## 🌍 SDG Alignment

**SDG 9 – Industry, Innovation and Infrastructure.**
AccessGuard strengthens digital infrastructure with secure, scalable access control, promotes innovation in cybersecurity, and supports reliable, secure and sustainable digital systems for organizations.

---

## 👨‍💻 Team

**Group A5 – S7 CSE, Batch A**

| Name | Roll No. |
|---|---|
| Anusha Antony | LVAS23CS205 |
| Adithya Shaiju | VAS23CS021 |
| Archana A D | VAS23CS062 |
| Anargha V P | VAS23CS047 |

**Project Guide:** Dr. Sajay K R, Head of Department, Dept. of CSE
**Institution:** Vidya Academy of Science & Technology

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">Made with ❤️ by Group A5, Vidya Academy of Science & Technology</p>
