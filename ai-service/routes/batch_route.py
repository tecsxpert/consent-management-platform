from flask import Blueprint, request, jsonify
from services.describe_service import generate_description
import time

batch_bp = Blueprint("batch", __name__)


@batch_bp.route("/batch-process", methods=["POST"])
def batch_process():

    data = request.get_json()

    # Validation
    if not data or "items" not in data:
        return jsonify({"error": "Missing 'items' field"}), 400

    items = data["items"]

    if not isinstance(items, list):
        return jsonify({"error": "'items' must be a list"}), 400

    if len(items) == 0:
        return jsonify({"error": "Items list cannot be empty"}), 400

    if len(items) > 20:
        return jsonify({"error": "Maximum 20 items allowed"}), 400

    results = []

    for item in items:

        text = str(item).strip()

        if len(text) < 10:
            results.append({
                "input": text,
                "error": "Input too short"
            })

            continue

        try:
            description = generate_description(text)

            results.append({
                "input": text,
                "description": description
            })

        except Exception:
            results.append({
                "input": text,
                "error": "Processing failed"
            })

        # 100ms delay
        time.sleep(0.1)

    return jsonify({
        "results": results,
        "processed_count": len(results)
    })