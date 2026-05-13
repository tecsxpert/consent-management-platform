# Consent Management Platform

# AI Service — Consent Management Platform

## Overview

This AI service powers intelligent privacy and consent analysis features for the Consent Management Platform.

The service provides:

- AI-generated consent descriptions
- Actionable recommendations
- AI report generation
- Document risk analysis
- Batch AI processing
- Retrieval-Augmented Generation (RAG)

Built using:

- Flask
- Groq API
- Sentence Transformers
- ChromaDB

---

# Features

## Implemented Endpoints

| Endpoint            | Method | Description                               |
| ------------------- | ------ | ----------------------------------------- |
| `/health`           | GET    | Service health check                      |
| `/describe`         | POST   | Generate professional consent description |
| `/recommend`        | POST   | Generate actionable recommendations       |
| `/generate-report`  | POST   | Generate AI report                        |
| `/analyse-document` | POST   | Analyze document risks and insights       |
| `/batch-process`    | POST   | Process multiple inputs together          |

---

# Project Structure

```text
ai-service/
│
├── routes/
├── services/
├── prompts/
├── rag/
├── docs/
├── tests/
├── app.py
├── requirements.txt
└── README.md
```

---

# Prerequisites

Install:

- Python 3.10+
- pip

---

# Setup Instructions

## 1. Clone repository

```bash
git clone https://github.com/Sourabhpdnker/consent-management-platform.git
```

---

## 2. Navigate to AI service

```bash
cd consent-management-platform/ai-service
```

---

## 3. Create virtual environment

```bash
python3 -m venv .venv
```

---

## 4. Activate virtual environment

### macOS/Linux

```bash
source .venv/bin/activate
```

### Windows

```bash
.venv\Scripts\activate
```

---

## 5. Install dependencies

```bash
pip install -r requirements.txt
```

---

# Environment Variables

Create:

```text
.env
```

Add:

```env
GROQ_API_KEY=your_api_key_here
```

---

# Run Application

```bash
python3 app.py
```

Server runs on:

```text
http://localhost:5001
```

---

# API Reference

---

## Health Check

### GET `/health`

### Response

```json
{
  "status": "ok"
}
```

---

## Describe Endpoint

### POST `/describe`

### Request

```json
{
  "text": "We collect user data for analytics."
}
```

### Response

```json
{
  "description": "Professional AI-generated description",
  "generated_at": "timestamp"
}
```

---

## Recommend Endpoint

### POST `/recommend`

### Request

```json
{
  "text": "Cookies are used for tracking."
}
```

### Response

```json
{
  "recommendations": [
    {
      "action_type": "review",
      "description": "Review cookie policy",
      "priority": "high"
    }
  ]
}
```

---

## Generate Report Endpoint

### POST `/generate-report`

### Response

```json
{
  "title": "Privacy Report",
  "executive_summary": "...",
  "overview": "...",
  "top_items": [],
  "recommendations": []
}
```

---

## Analyse Document Endpoint

### POST `/analyse-document`

### Response

```json
{
  "findings": [
    {
      "type": "risk",
      "description": "Third-party sharing detected",
      "severity": "high"
    }
  ]
}
```

---

## Batch Process Endpoint

### POST `/batch-process`

### Request

```json
{
  "items": ["Text 1", "Text 2"]
}
```

### Response

```json
{
  "results": [],
  "processed_count": 2
}
```

---

# Running Tests

```bash
python3 -m pytest
```

---

# RAG Pipeline

The project includes:

- document chunking
- embeddings generation
- ChromaDB vector storage
- semantic retrieval

To build RAG database:

```bash
python3 rag/build_rag.py
```

---

# Technologies Used

- Flask
- Groq API
- ChromaDB
- Sentence Transformers
- Pytest

---

# Contributors

AI Developer 1 — Sourabh Pedanekar
