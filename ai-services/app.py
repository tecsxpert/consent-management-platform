from flask import Flask
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

from routes.test_routes import test_bp

app = Flask(__name__)

# Rate limiter
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["30 per minute"]
)

# Register routes
app.register_blueprint(test_bp)

# Security headers
@app.after_request
def add_security_headers(response):
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    return response

@app.route("/")
def home():
    return {"status": "AI Service Running Securely"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)