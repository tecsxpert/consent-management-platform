from flask import Blueprint, request, jsonify
from datetime import datetime
from services.describe_service import generate_description

describe_bp = Blueprint("describe", __name__)

@describe_bp.route("/describe", methods=["POST"])
def describe():
    data = request.get_json()

    if not data or "text" not in data:
        return jsonify({"error": "Missing 'text' field"}), 400

    consent_text = str(data["text"]).strip()

    if len(consent_text) < 10:
        return jsonify({"error": "Input text too short"}), 400

    try:
        result = generate_description(consent_text)
    except Exception:
        return jsonify({"error": "AI service failed"}), 500

    return jsonify({
        "description": result,
        "generated_at": datetime.utcnow().isoformat()
    })