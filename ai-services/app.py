from flask import Flask
from flask_limiter import Limiter

# Step 1: Create app
app = Flask(__name__)

# Step 2: Setup limiter
limiter = Limiter(key_func=lambda: "global")

# Step 3: Attach limiter
limiter.init_app(app)

@app.route("/")
def home():
    return "API running"

if __name__ == "__main__":
    app.run(debug=True)