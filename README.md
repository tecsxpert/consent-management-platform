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
- sentence-transformers
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
├── Dockerfile
└── README.md
```

Technologies Used
Flask
Groq API
ChromaDB
sentence-transformers
Pytest
Python

Performance Optimizations
Implemented optimizations:

preloaded SentenceTransformer model at startup

reused embedding model globally

reduced prompt verbosity

modular AI service architecture

Future improvements:

Redis caching

async processing

SSE streaming

background workers

rate limiting

Production Notes
Recommended future improvements:

authentication and authorization

Docker Compose deployment

Kubernetes support

centralized logging

monitoring dashboards

Contributor

Sourabh Pedanekar — AI Developer 1
