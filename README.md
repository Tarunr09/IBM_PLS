🗣️ IBM - PLS 
🚀 Introduction
The Speech Generator Application is a powerful tool for creating custom speeches based on user-selected topics and stylistic preferences. The application utilizes the Google Generative AI (Gemini 1.5) model to craft speeches with a balance of logical (left-brain) and creative (right-brain) elements. The frontend is built with React, while the backend leverages Flask to handle API requests.
📜 Table of Contents
•	Introduction
•	Features
•	Installation
•	Usage
•	API Endpoints
•	Dependencies
•	Configuration
•	Troubleshooting
•	Contributors
•	License
✨ Features
•	Dynamic Speech Generation: Create speeches tailored to your preferences by combining left-brain and right-brain elements.
•	Multi-Format Downloads: Export the generated speech as PDF, DOCX, or TXT files.
•	Customizable Output: Choose between text, voice script, and video script formats.
•	User-Friendly Interface: A responsive and intuitive design built with modern web technologies.
🛠️ Installation
Prerequisites
•	Python 3.7+
•	Node.js 12+
•	npm or yarn
•	Flask and React
Backend Setup
1.	Clone the repository:
bash
Copy code
git clone https://github.com/yourusername/speech-generator.git
cd speech-generator/backend
2.	Install Python dependencies:
bash
Copy code
pip install -r requirements.txt
3.	Configure the Google AI API key:
bash
Copy code
export API_KEY="your-google-api-key"
4.	Start the Flask server:
bash
Copy code
python app.py
Frontend Setup
1.	Navigate to the frontend directory:
bash
Copy code
cd ../frontend
2.	Install Node.js dependencies:
bash
Copy code
npm install
3.	Start the React development server:
bash
Copy code
npm start
🖥️ Usage
1.	Open your browser and go to http://localhost:3000.
2.	Enter a topic and select the desired left-brain and right-brain elements.
3.	Choose your preferred style and click the Generate button.
4.	Once the speech is generated, download it in PDF, DOCX, or TXT format.
🔌 API Endpoints
•	POST /generate_speech: Generates a speech based on the provided topic, left-brain elements, right-brain elements, and style.
Request Body:
json
Copy code
{
  "topic": "Your Topic",
  "left_elements": ["Educate", "Inform"],
  "right_elements": ["Entertain", "Inspire"],
  "style": "Text"
}
Response:
json
Copy code
{
  "speech": "Generated speech content..."
}
📦 Dependencies
Backend
•	Flask: Python web framework.
•	Flask-CORS: To handle Cross-Origin Resource Sharing.
•	Google Generative AI: Used for speech generation.
Frontend
•	React: JavaScript library for building user interfaces.
•	Axios: For making HTTP requests to the backend.
•	jsPDF: For generating PDF files.
•	docx: For generating DOCX files.
•	file-saver: For saving files locally.
⚙️ Configuration
•	Ensure your Google AI API key is set in the environment variable API_KEY.
•	Modify the Flask server's configuration in app.py if needed.
❓ Troubleshooting
•	Speech Generation Issues: Verify that your API key is correct and that all required parameters (topic, left elements, right elements, style) are provided.
•	CORS Errors: Check that the Flask app is correctly configured to accept requests from the frontend.
👥 Contributors
[project_name/our names]- Developer
📄 License
This project is licensed under the MIT License.
 
