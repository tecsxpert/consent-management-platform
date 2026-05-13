import json


def call_groq(prompt):

    """
    Mock Groq response function
    Used for development and testing
    """

    prompt_lower = prompt.lower()

    # Recommendation response
    if "recommendations" in prompt_lower:

        return json.dumps({
            "recommendations": [
                {
                    "action_type": "review",
                    "description": "Review third-party data sharing practices.",
                    "priority": "high"
                },
                {
                    "action_type": "update",
                    "description": "Improve consent transparency for users.",
                    "priority": "medium"
                },
                {
                    "action_type": "monitor",
                    "description": "Monitor cookie tracking compliance regularly.",
                    "priority": "low"
                }
            ]
        })

    # Document analysis response
    elif "findings" in prompt_lower:

        return json.dumps({
            "findings": [
                {
                    "type": "risk",
                    "description": "Third-party sharing detected.",
                    "severity": "high"
                },
                {
                    "type": "insight",
                    "description": "User consent withdrawal is supported.",
                    "severity": "medium"
                },
                {
                    "type": "risk",
                    "description": "Cookies are used for behavioral tracking.",
                    "severity": "medium"
                }
            ]
        })

    # Report generation response
    elif "executive_summary" in prompt_lower:

        return json.dumps({
            "title": "Privacy Compliance Report",
            "executive_summary": "The system demonstrates moderate privacy compliance with some identified risks.",
            "overview": "The analyzed policies include user tracking, cookie usage, and third-party sharing.",
            "top_items": [
                "Third-party data sharing",
                "Cookie tracking",
                "User analytics collection"
            ],
            "recommendations": [
                "Improve transparency",
                "Reduce unnecessary tracking",
                "Enhance consent controls"
            ]
        })

    # Default describe response
    return json.dumps({
        "description": "This policy explains how user data is collected, processed, and used for analytics, personalization, and service improvement purposes."
    })