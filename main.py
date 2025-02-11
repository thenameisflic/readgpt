import json
import os

import requests
import uvicorn
from bs4 import BeautifulSoup
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from pydantic import BaseModel
from readability import Document

load_dotenv()

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

app = FastAPI()

frontend_urls = os.getenv("FRONTEND_URLS", "").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=frontend_urls,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type", "Accept"],
)


@app.get("/")
async def root():
    return {"ok": True, "version": "0.1.0"}


class SummarizationRequest(BaseModel):
    url: str


def remove_all_attributes(soup):
    for tag in soup.find_all(True):  # Find all tags
        tag.attrs = {}  # Remove all attributes
    return soup


@app.post("/summarize")
async def summarize(request: SummarizationRequest):
    response = requests.get(request.url)
    doc = Document(response.text)
    soup = BeautifulSoup(doc.summary(), "html.parser")
    soup = remove_all_attributes(soup)

    summary = " ".join(soup.stripped_strings)

    gpt_response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": [
                    {
                        "type": "text",
                        "text": 'Extract key information from a string that was originally an HTML article with tags removed. Provide a concise summary, bullet points of main topics, and suggest follow-up questions.\n\n# Steps\n\n1. **Read the String**: Begin by reading the given string thoroughly, acknowledging that it might be missing some context or contain errors due to the stripping of HTML tags. \n\n2. **Identify Core Ideas**: Identify the central themes and ideas within the string. Focus on extracting the content that seems to provide the main points or arguments of the article.\n\n3. **Summarize Content**: Create a concise summary capturing the essence of the article, focusing on the main ideas and eliminating trivial details.\n\n4. **List Bullet Points**: Break down the main topics or sections of the article into bullet points that highlight key points.\n\n5. **Formulate Follow-up Questions**: Based on the summary and bullet points, generate relevant follow-up questions to deepen understanding or expand on the article\'s topics. Make sure the questions that you suggest can be answered using ONLY the contents of the article and no other external sources.\n\n# Output Format\n\n- Provide a concise paragraph summarizing the essential points of the article.\n- Include a list of bullet points for the main topics or sections.\n- Suggest 3-5 follow-up questions to promote further exploration or discussion.\n\n# Examples\n\n**Input String**:\n"Understanding AI Artificial Intelligence (AI) is transforming industries... [Additional content without HTML tags]"\n\n**Output**:\n\n- **Summary**: Understanding AI explores the transformative effects of artificial intelligence across various industries, highlighting significant advancements and their implications for future developments.\n  \n- **Bullet Points**:\n  - Transformation of industries by AI\n  - Key technological advancements\n  - Future implications\n\n- **Follow-up Questions**:\n  1. What are some specific examples of industries transformed by AI?\n  2. How do technological advancements in AI impact daily life?\n  3. What are the potential future developments in AI anticipated by experts?\n\n# Notes\n\n- Ensure that the summary succinctly covers the main ideas, while bullet points and questions promote clarity and deeper engagement.\n- Be mindful of inconsistencies or errors that may arise from missing HTML context.',  # noqa
                    }
                ],
            },
            {"role": "user", "content": [{"type": "text", "text": summary}]},
        ],
        response_format={
            "type": "json_schema",
            "json_schema": {
                "name": "article_analysis",
                "strict": True,
                "schema": {
                    "type": "object",
                    "required": ["summary", "follow_up_questions", "important_points"],
                    "properties": {
                        "summary": {
                            "type": "string",
                            "description": "A summary of the article's contents providing insights on the main ideas.",
                        },
                        "important_points": {
                            "type": "array",
                            "items": {"type": "string", "description": "An important bullet point regarding the article."},
                            "description": "Important bullet points about the article that the user should consider.",
                        },
                        "follow_up_questions": {
                            "type": "array",
                            "items": {"type": "string", "description": "A suggested follow up question."},
                            "description": "A list of suggestions for follow up questions related to the article.",
                        },
                    },
                    "additionalProperties": False,
                },
            },
        },
        temperature=1,
        max_completion_tokens=2048,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
    )

    return {"title": doc.title(), "content": summary, "gpt": json.loads(gpt_response.choices[0].message.content)}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
