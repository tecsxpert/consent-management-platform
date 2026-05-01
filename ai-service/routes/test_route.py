from flask import Blueprint

test_bp = Blueprint("test", __name__)

@test_bp.route("/test")
def test():
    return "Test route working!"