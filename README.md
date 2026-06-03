# ScopeIQ Frontend

<div align="center">

# ScopeIQ

<img src="./public/logo.png" alt="ScopeIQ Logo" width="180"/>

### AI-Powered Scope Governance & Project Intelligence Platform

Transforming project management through intelligent scope tracking, client transparency, and predictive project analytics.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/TailwindCSS-4-06B6D4)
![License](https://img.shields.io/badge/License-MIT-green)

</div>

---

## Overview

ScopeIQ is an AI-powered Scope Governance and Project Intelligence platform designed to solve one of the most common reasons software projects fail:

### Scope Drift

As projects evolve, clients request new features, revisions, and changes. These modifications often impact timelines, budgets, and project health. Traditional project management tools track tasks but fail to provide visibility into how project scope evolves over time.

ScopeIQ bridges this gap by providing:

* Intelligent Proposal Management
* Revision Tracking
* Project Health Monitoring
* Client Transparency
* Milestone Tracking
* Risk Analytics
* AI-Powered Project Insights

---

## Core Features

### Proposal Management

Create, manage, and negotiate project proposals before project initiation.

Features:

* Proposal Creation
* Version History
* Proposal Approval Workflow
* Client Review System
* Proposal Revisions

---

### Project Intelligence Dashboard

Gain complete visibility into project performance.

Features:

* Project Health Scores
* Scope Growth Analysis
* Timeline Tracking
* Delivery Confidence Metrics
* Progress Monitoring

---

### Client Collaboration

Maintain transparency throughout the project lifecycle.

Features:

* Proposal Reviews
* Ticket Management
* Real-Time Communication
* Feedback Submission
* Revision Requests

---

### Scope Governance

Track and manage scope evolution intelligently.

Features:

* Scope Change Detection
* Revision Analysis
* Scope Growth Monitoring
* Historical Tracking
* Audit Logs

---

### AI Insights (Future Release)

Machine Learning powered project analytics.

Planned Capabilities:

* Delay Prediction
* Scope Drift Detection
* Risk Scoring
* Project Health Forecasting
* Intelligent Recommendations

---

## Tech Stack

### Framework

* Next.js 15
* React 19
* TypeScript

### UI

* Tailwind CSS
* ShadCN UI
* Lucide Icons

### State Management

* Redux Toolkit
* TanStack Query

### Forms & Validation

* React Hook Form
* Zod

### API Communication

* Axios

### Authentication

* JWT Authentication
* Refresh Tokens
* Session Management

---

## Project Structure

```bash
src/
│
├── app/
│   ├── (public)/
│   ├── (auth)/
│   ├── dashboard/
│   └── api/
│
├── components/
│   ├── common/
│   ├── layout/
│   ├── forms/
│   ├── dashboard/
│   ├── proposal/
│   └── project/
│
├── modules/
│   ├── auth/
│   ├── users/
│   ├── proposals/
│   ├── projects/
│   ├── tickets/
│   ├── notifications/
│   └── analytics/
│
├── hooks/
│
├── services/
│
├── store/
│
├── lib/
│
├── types/
│
├── constants/
│
└── utils/
```

---

## Authentication Flow

ScopeIQ uses a dynamic authentication flow.

### Existing User

```text
Email
 ↓
Password
 ↓
Dashboard
```

### New User

```text
Email
 ↓
OTP Verification
 ↓
Complete Profile
 ↓
Select Role
 ↓
Dashboard
```

Supported Roles:

* Project Manager
* Client

---

## Available Pages

### Public Pages

* Home
* About
* Case Studies
* Pricing
* Contact

### Authentication

* Email Verification
* OTP Verification
* Complete Profile
* Role Selection

### Dashboard

#### Project Manager

* Dashboard
* Projects
* Proposals
* Tickets
* Analytics
* Messages
* Notifications
* Settings

#### Client

* Dashboard
* Projects
* Proposals
* Tickets
* Messages
* Notifications
* Settings

---

## Getting Started

### Clone Repository

```bash
git clone https://github.com/your-org/scopeiq-frontend.git
```

### Navigate To Project

```bash
cd scopeiq-frontend
```

### Install Dependencies

```bash
npm install
```

### Setup Environment Variables

Create a `.env.local` file.

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_NAME=ScopeIQ
```

### Run Development Server

```bash
npm run dev
```

Application will be available at:

```bash
http://localhost:3000
```

---

## Build For Production

```bash
npm run build
```

```bash
npm run start
```

---

## Code Quality

### Lint

```bash
npm run lint
```

### Format

```bash
npm run format
```

### Type Check

```bash
npm run type-check
```

---

## Design Philosophy

ScopeIQ follows a modern SaaS design approach inspired by:

* Linear
* Stripe
* Vercel
* Notion
* Raycast

Design Principles:

* Clean Interfaces
* Transparency
* Data-Driven Decisions
* Minimal Friction
* Modern User Experience

---

## Roadmap

### Version 1.0

* Authentication
* Proposal Management
* Project Management
* Ticket System
* Messaging
* Notifications

### Version 1.5

* Analytics Dashboard
* Audit Logs
* Activity Tracking

### Version 2.0

* AI Risk Analysis
* Scope Drift Detection
* Delay Prediction
* Project Health Forecasting





---

## License

This project is developed for academic and research purposes under the ScopeIQ initiative.
