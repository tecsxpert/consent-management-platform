from flask import Flask
from routes.test_route import test_bp

app = Flask(__name__)

# register blueprint
app.register_blueprint(test_bp)

@app.route("/")
def home():
    return "AI Service is running!"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)