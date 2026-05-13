from services.groq_client import call_groq

def analyse_document(document_text):

    try:
        with open("prompts/analyse_prompt.txt", "r") as f:
            prompt_template = f.read()

    except Exception:
        raise Exception("Prompt file not found")

    prompt = prompt_template.replace("{input}", document_text)

    ai_response = call_groq(prompt)

    return ai_response