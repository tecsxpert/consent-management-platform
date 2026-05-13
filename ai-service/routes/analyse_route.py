from flask import Blueprint, request, jsonify
from datetime import datetime
from services.analyse_service import analyse_document
import json

analyse_bp = Blueprint("analyse", __name__)

@analyse_bp.route("/analyse-document", methods=["POST"])
def analyse():

    data = request.get_json()

    if not data or "text" not in data:
        return jsonify({"error": "Missing 'text' field"}), 400

    document_text = str(data["text"]).strip()

    if len(document_text) < 10:
        return jsonify({"error": "Input text too short"}), 400

    try:
        ai_response = analyse_document(document_text)

        findings_data = json.loads(ai_response)

    except json.JSONDecodeError:
        return jsonify({"error": "Invalid AI JSON response"}), 500

    except Exception:
        return jsonify({"error": "Document analysis failed"}), 500

    return jsonify({
        "findings": findings_data["findings"],
        "generated_at": datetime.utcnow().isoformat()
    })