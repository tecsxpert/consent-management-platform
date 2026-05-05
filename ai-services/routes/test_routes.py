from flask import Blueprint, request, jsonify
from services.sanitizer import sanitize_input

test_bp = Blueprint("test", __name__)

@test_bp.route("/test", methods=["POST"])
def test_route():
    try:
        data = request.json.get("text")

        clean_data = sanitize_input(data)

        return jsonify({
            "message": "Input is safe",
            "cleaned": clean_data
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400