# SECURITY.md

## 1. SQL Injection
Attack: Malicious SQL input  
Impact: Data leakage  
Mitigation: Input validation and parameterized queries  

## 2. Cross-Site Scripting (XSS)
Attack: Inject scripts  
Impact: Steal user data  
Mitigation: Input sanitisation  

## 3. Broken Authentication
Attack: Unauthorized access  
Impact: Data misuse  
Mitigation: JWT authentication  

## 4. Rate Limiting Failure
Attack: Too many requests  
Impact: Server crash  
Mitigation: flask-limiter  

## 5. Prompt Injection
Attack: Manipulate AI prompts  
Impact: Wrong AI output  
Mitigation: Input filtering