import os
from groq import Groq
from dotenv import load_dotenv

# Load .env
load_dotenv()

# Read API key
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Create Groq client
client = Groq(api_key=GROQ_API_KEY)


def call_groq(prompt):

    try:
        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.3,
            max_tokens=500
        )

        response = completion.choices[0].message.content

        return response

    except Exception as e:
        return f"Groq API Error: {str(e)}"