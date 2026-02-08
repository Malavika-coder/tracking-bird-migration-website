from flask import Flask, jsonify, request
from flask_cors import CORS
from routes import api_bp
import os

def create_app():
    app = Flask(__name__)
    
    # 👇 UPDATE THIS LINE - Allow all origins including file://
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    
    # Register blueprints
    app.register_blueprint(api_bp, url_prefix='/api')
    
    @app.route('/')
    def serve_frontend():
        return "Backend is running! Use the frontend files separately."
    
    return app

if __name__ == '__main__':
    app = create_app()
    # 👇 UPDATE THIS LINE - Add host parameter
    app.run(debug=True, port=5000, host='0.0.0.0')
    