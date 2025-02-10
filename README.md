# ReadGPT.news

ReadGPT.news is a progressive web application that allows users to paste a link to an article, get an AI-generated summary of the content, and start an interactive chat session with the article. It’s designed to help users quickly understand and engage with long-form content using the power of AI.

---

## Features

1. **Article Summarization**:
   - Users paste a link to an article.
   - The app extracts the article content and generates a concise summary using OpenAI's GPT API.

2. **Interactive Chat**:
   - Users can ask questions or discuss the article in a chat interface.
   - The app uses GPT to provide context-aware responses based on the article content.

3. **Direct Link Access**:
   - Users can type `readgpt.news/<LINK>` in their browser, and the app will automatically process the article.
   - For example, `readgpt.news/https://example.com/article` will directly open and summarize the article.

4. **Web Share Target API**:
   - Users can share links directly to the app from their browser or other apps.
   - The app will process the shared link and display the summary and chat interface.

5. **Progressive Web App (PWA)**:
   - Installable on desktop and mobile devices for easy access.
   - Works offline for previously summarized articles (cached data).

6. **Rate Limiting**:
   - Implement rate limits to prevent abuse (e.g., 5 requests per hour per IP address).

7. **Responsive UI**:
   - A clean, modern, and responsive user interface built with React and Next.js.
   - Easy-to-use forms for submitting links and chatting with articles.

---

## Tech Stack

1. **Frontend**:
   - **Next.js**: For server-side rendering, routing, and building a fast, scalable frontend.
   - **React**: For building interactive UI components (e.g., chat interface, forms).
   - **Tailwind CSS**: For styling and creating a modern, responsive design.

2. **Backend**:
   - **Python (FastAPI)**: For handling article extraction, summarization, and chat interactions.
   - **OpenAI API**: For generating summaries and powering the chat functionality.

3. **PWA**:
   - **Next.js PWA Plugin**: For enabling Progressive Web App features (e.g., offline support, installability).
   - **Service Workers**: For caching and offline functionality.

4. **Web Share Target API**:
   - **Manifest Configuration**: To register the app as a share target.
   - **Dynamic Routing**: To handle shared links and process them automatically.

5. **Rate Limiting**:
   - **Redis**: For storing and tracking request counts per IP address.
   - **Middleware**: Implement rate-limiting logic in the backend.

6. **Deployment**:
   - **Render**: For deploying the Python backend and Next.js frontend.

---

## Why It’s Cool

1. **AI-Powered**:
   - Leverages OpenAI's GPT to provide smart summarization and interactive chat, making it a cutting-edge application.

2. **User-Friendly**:
   - No need for users to log in or generate API keys—everything works seamlessly.
   - Direct link access (`readgpt.news/<LINK>`) and Web Share Target API make it super easy to use.

3. **Progressive Web App**:
   - Installable on devices and works offline for cached content.
   - Provides a native app-like experience without requiring an app store.

4. **Scalable**:
   - Built with modern frameworks and tools, making it easy to scale and add new features in the future.

---

## Roadmap

1. **Phase 1: MVP**:
   - Build the core functionality: article summarization and chat.
   - Implement rate limiting to prevent abuse.

2. **Phase 2: Ease of use**:
   - Add direct link access (`readgpt.news/<LINK>`).
   - Enable PWA features (offline support, installability).
   - Integrate the Web Share Target API.

3. **Phase 3: Enhancements**:
   - Improve the UI with animations and better visual feedback.
   - Add support for more article sources (e.g., PDFs, blogs).

4. **Phase 4: Advanced Features**:
   - Allow users to save and revisit past articles and chats (using local storage or cookies).
   - Add multi-language support for summarization and chat.

---

## Target Audience

- **Busy Professionals** who want to quickly understand articles without reading the full text.
- **Students** who need to summarize and discuss academic papers or news articles.
- **Curious Readers** who enjoy engaging with content in an interactive way.

---

## Success Metrics

- **User Engagement**: Number of articles summarized and chat interactions per session.
- **Traffic**: Number of unique visitors and requests per day.
- **Retention**: Percentage of users who return to the app after their first visit.

---

## Rate Limiting Implementation

To prevent abuse, the app implements rate limiting by tracking requests by **IP address**. Here’s how it works:

1. **Backend Logic**:
   - We se **Redis** to store request counts per IP address.

2. **Middleware**:
   - We have a middleware function in the backend to check the request count for the user's IP address.
   - If the limit is exceeded, we return a `429 Too Many Requests` response with a friendly message.

---

## Direct Link Access Implementation

To enable `readgpt.news/<LINK>`, we use **Next.js dynamic routing**. Here’s how it works:

1. **Dynamic Route**:
   - Through dynamic routing, `pages/[...slug].js` in the Next.js project extracts the link from the URL and pass it to the backend for processing.

2. **Backend Integration**:
   - The backend extracts the article content and generates a summary.
   - The summary and chat interface are displayed on the frontend.

3. **Example URL**:
   - `readgpt.news/https://example.com/article` will automatically summarize the article at `https://example.com/article`.

---

## Web Share Target API Implementation

To enable link sharing with the app, we use the **Web Share Target API**. Here’s how it works:

1. **Manifest Configuration**:
   - The `share_target` field in `manifest.json` registers the app as a share target.
   - Example:
     ```json
     {
       "share_target": {
         "action": "/share",
         "method": "GET",
         "enctype": "application/x-www-form-urlencoded",
         "params": {
           "url": "link"
         }
       }
     }
     ```

2. **Dynamic Routing**:
   - The `/share` route handles shared links.
   - Extract the shared link and process it like a direct link.

3. **User Experience**:
   - Users can share links from their browser or other apps directly to ReadGPT.news.
   - The app will automatically process the shared link and display the summary and chat interface.

---

## PWA Implementation

To make the app a **Progressive Web App (PWA)**, we use the following:

1. **Next.js PWA Plugin**:
   - We use the `next-pwa` plugin to enable PWA features.

2. **Service Workers**:
   - Automatically generated by the `next-pwa` plugin for caching and offline support.

3. **Manifest File**:
   - `manifest.json` defines app metadata (e.g., name, icons, theme color).

4. **Installability**:
   - Users can install the app on their devices for easy access.

5. **Offline Support**:
   - Cached summaries and chat sessions are available offline.

---

## Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/readgpt-news.git
   cd readgpt-news
   
2. **Set Up the Backend**:
- Install dependencies:
```uv install -r requirements.txt```
- Set up Redis for rate limiting.
- Add your OpenAI API key to the environment variables.

3. **Set Up the Frontend**:
- Install dependencies:
  ```
  cd frontend
  npm install
  ```

- Run the development server:
  `npm run dev` 

## License

This project is licensed under the [CC BY-NC-ND](https://creativecommons.org/licenses/by-nc-nd/4.0/). See the LICENSE file for details.
