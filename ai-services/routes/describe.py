from services.sanitizer import sanitize_input

@app.route('/describe', methods=['POST'])
def describe():
    data = request.json.get("text")

    try:
        clean_data = sanitize_input(data)
    except:
        return {"error": "Invalid input"}, 400