import os
import google.generativeai as genai
import json


class WebsiteSummarizer:
    def __init__(self, api_key: str, model_name: str = "gemini-1.5-flash"):
        # Configure the Gemini API with the API key
        genai.configure(api_key=api_key)

        # Set up the model configuration
        self.generation_config = {
            "temperature": 1,
            "top_p": 0.95,
            "top_k": 40,
            "max_output_tokens": 8192,
            "response_mime_type": "application/json",  # Get structured JSON response
        }

        # Initialize the model with the provided configuration
        self.model = genai.GenerativeModel(
            model_name=model_name,
            generation_config=self.generation_config
        )

    def summarize_data(self, scraped_data: str) -> dict:
        # Define the prompt for generating detailed summary and quick summary
        prompt = f"""
                Summarize the provided data from a website or news article into the following JSON format:

                {{
                  "displayName": "A concise display name for the content, summarizing its essence in 5 to 8 words.",
                  "details": "Markdown formatted detailed summary of the content, including headings, sub-headings, bullet points, and important links.",
                  "quickSummary": "A concise summary Markdown formatted of the website’s key information, between 10 to 15 lines, covering the main points."
                }}

                **Detailed Instructions:**

                1. **Extract and Create a Display Name (5-8 Words):**
                   - Generate a concise display name that captures the essence or main topic of the content.
                   - Use no more than 8 words and ensure it provides a clear, high-level description of the content.

                2. **Extract and Format Headings and Sub-headings (Markdown):**
                   - From the provided data, extract all major headers (h1, h2, etc.) and present them as markdown headings.
                   - For h1 tags, use ## for the main heading, ### for sub-headings, and so on.
                   - For each h2 and h3 under the h1 sections, format them as sub-headings in markdown. Make sure to include all relevant sections such as main topics and articles.
                   - If there are any recurring patterns in headings (e.g., News, War in Ukraine), group them under logical headings.

                3. **Details (Markdown Format):**
                   - Break down key content under each heading or sub-heading into bulleted lists where applicable, using - for bullet points.
                   - Summarize important updates and key points under each sub-heading.
                   - If there are links in the content, include them in markdown link format ([Link Text](URL)).
                   - Focus on providing critical details and updates, such as statistics, key people, events, or decisions.

                4. **Quick Summary (10 to 15 Lines):**
                   - Provide a short, concise summary of the most important information from the data.
                   - Limit the summary to 10-15 lines and ensure it covers the core topics, headlines, and the most important updates from the input.
                   - The quick summary should capture the essence of the news or content without excessive details. Focus on what matters the most.

                **Additional Notes for Guidance:**
                - If there are repeated sections such as "Latest updates", consolidate them and avoid redundancy.
                - If there are metadata or irrelevant content (like copyright text, or footer), exclude it from the summary.
                - If there are specific event-related details (like death tolls, statistics, etc.), highlight those as important data points.
                - Include any mentioned dates, places, or people to ensure proper context is provided.
                - Ensure that your output is structured correctly in the JSON format with `displayName`, `details` in markdown, and `quickSummary` in a brief, readable paragraph.

                **Output Format (JSON):**

                {{
                  "displayName": "A concise display name for the content, summarizing its essence in 5 to 8 words.",
                  "details": "Markdown formatted detailed summary of the content, including headings, sub-headings, bullet points, and important links.",
                  "quickSummary": "A concise summary of the website’s key information, between 10 to 15 lines, covering the main points."
                }}
                """

        # Start a new chat session
        chat_session = self.model.start_chat(
            history=[]  # History can be left empty, or previous context can be added
        )

        # Send the message with the scraped data and the prompt
        response = chat_session.send_message(f"{scraped_data}\n\n{prompt}")

        # Parse and return the response as a JSON object
        return json.loads(response.text)
