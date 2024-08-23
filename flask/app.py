import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Configure the Google AI API key
genai.configure(api_key=os.environ.get("API_KEY", "AIzaSyDVmsAiMCEcXnehSB3vSFlAm4eIXvnR2e8"))

# Create the model
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
)

app = Flask(__name__)
CORS(app, resources={r"/generate_speech": {"origins": "*"}})  # Enable CORS for specific endpoint

def generate_speech(topic, left_elements, right_elements, style):
    elements = left_elements + right_elements
    element_descriptions = ", ".join(elements)

    prompt = (
        f"Generate a 500-word speech about {topic} which is to be told in an entertaining way. "
        f"The speech should have a balance between right and left brain elements: {element_descriptions}. "
        f"Make sure to include relevant pictures as well. "
        f"The preferred style is {style}."
    )

    response = model.generate_content([prompt])
    return response.text

@app.route('/generate_speech', methods=['POST'])
def generate_speech_route():
    try:
        data = request.get_json()
        logging.debug(f"Received data: {data}")

        topic = data.get('topic')
        left_elements = data.get('left_elements')
        right_elements = data.get('right_elements')
        style = data.get('style')

        if not topic or not left_elements or not right_elements or not style:
            logging.error("Missing parameters")
            return jsonify({"error": "Missing parameters"}), 400

        speech = generate_speech(topic, left_elements, right_elements, style)
        return jsonify({"speech": speech})

    except Exception as e:
        logging.error(f"Error generating speech: {e}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/')
def index():
    return 'API is running'

if __name__ == '__main__':
    print("Starting Flask server...")
    print("Available routes:")
    for rule in app.url_map.iter_rules():
        print(f"{rule} -> {rule.endpoint}")
    app.run(debug=True)
