from flask import Blueprint, request, jsonify
from datetime import datetime
from services.recommend_service import generate_recommendations
import json

recommend_bp = Blueprint("recommend", __name__)

@recommend_bp.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()

    # Validation
    if not data or "text" not in data:
        return jsonify({"error": "Missing 'text' field"}), 400

    consent_text = str(data["text"]).strip()

    if len(consent_text) < 10:
        return jsonify({"error": "Input text too short"}), 400

    try:
        ai_response = generate_recommendations(consent_text)

        # Convert AI JSON string to Python object
        recommendations_data = json.loads(ai_response)

    except json.JSONDecodeError:
        return jsonify({"error": "Invalid AI JSON response"}), 500

    except Exception:
        return jsonify({"error": "Recommendation service failed"}), 500

    return jsonify({
        "recommendations": recommendations_data["recommendations"],
        "generated_at": datetime.utcnow().isoformat()
    })