import json

from flask import Flask, request
from flask_cors import CORS

from src.summarizer.website_summarizer import WebsiteSummarizer

# Create a Flask application instance
app = Flask(__name__)
CORS(app)

# Define a route for the root URL
@app.route('/hello', methods=['GET'])
def hello_world():
    return {'message': 'Hello, World!'}

@app.route('/summarize-scrape-data', methods=['POST'])
def summarize_scrape_data():
    # Get the JSON data from the request
    data = request.data

    # Extract the 'scraped_data' field (assuming it is a key in the JSON payload)
    api_key = "AIzaSyCtrL0rbx2nTnqTkTS9uvqvS1PQrf0U64Q"
    summarizer = WebsiteSummarizer(api_key=api_key)
    summarize_scrape_data = summarizer.summarize_data(data)

    # Handle the scraped data (just for demonstration)
    return json.dumps(summarize_scrape_data, indent=2)

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
