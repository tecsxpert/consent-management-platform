import bleach

BLOCKED_PATTERNS = [
    "ignore previous",
    "system prompt",
    "bypass",
    "hack",
    "override"
]

def sanitize_input(text):
    if not text:
        raise ValueError("Empty input not allowed")

    # Remove HTML tags
    clean_text = bleach.clean(text)

    # Detect prompt injection
    for pattern in BLOCKED_PATTERNS:
        if pattern in clean_text.lower():
            raise ValueError("Malicious input detected")

    return clean_text