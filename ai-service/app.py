from flask import Flask

from routes.describe_route import describe_bp
from routes.recommend_route import recommend_bp
from routes.report_route import report_bp
from routes.analyse_route import analyse_bp

app = Flask(__name__)

# Register blueprints
app.register_blueprint(describe_bp)
app.register_blueprint(recommend_bp)
app.register_blueprint(report_bp)
app.register_blueprint(analyse_bp)


# Health endpoint
@app.route("/health")
def health():
    return {"status": "ok"}


# Home endpoint
@app.route("/")
def home():
    return "AI Service is running!"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)