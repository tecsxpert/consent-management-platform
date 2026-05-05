# SECURITY.md

## Overview
This document outlines security measures implemented in the AI service.

---

## 1. Input Sanitization
Attack: XSS / Prompt Injection  
Impact: Malicious AI output  
Mitigation: HTML stripping and pattern detection  

---

## 2. Rate Limiting
Attack: API abuse / DoS  
Impact: Service crash  
Mitigation: 30 req/min default, 10 req/min critical endpoints  

---

## 3. Prompt Injection Protection
Attack: Manipulating AI prompts  
Impact: Unsafe or incorrect output  
Mitigation: Pattern filtering and validation  

---

## 4. Security Headers
Headers added:
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection  

---

## 5. API Error Handling
All errors return safe responses (no stack traces)

---

## 6. Security Testing
Tool used: OWASP ZAP  

Tests performed:
- Injection attempts
- Rate limit validation
- Invalid inputs  

---

## 7. PII Protection
No personal data stored or logged  

---

## 8. Residual Risks
- AI model unpredictability
- External API dependency  

---

## 9. Final Status
All critical and high vulnerabilities resolved.
