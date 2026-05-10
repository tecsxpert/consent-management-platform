from flask import Blueprint, request, jsonify
from datetime import datetime
from services.report_service import generate_report
import json

report_bp = Blueprint("report", __name__)

@report_bp.route("/generate-report", methods=["POST"])
def generate_report_route():

    data = request.get_json()

    # Validation
    if not data or "text" not in data:
        return jsonify({"error": "Missing 'text' field"}), 400

    consent_text = str(data["text"]).strip()

    if len(consent_text) < 10:
        return jsonify({"error": "Input text too short"}), 400

    try:
        ai_response = generate_report(consent_text)

        report_data = json.loads(ai_response)

    except json.JSONDecodeError:
        return jsonify({"error": "Invalid AI JSON response"}), 500

    except Exception:
        return jsonify({"error": "Report generation failed"}), 500

    return jsonify({
        "report": report_data,
        "generated_at": datetime.utcnow().isoformat()
    })