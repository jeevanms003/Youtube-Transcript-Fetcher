# YouTube Transcript Fetcher

YouTube Transcript Fetcher is a simple Node.js application built with Express.js that retrieves transcripts for YouTube videos using the `youtube-transcript-plus` library.  
The application exposes a RESTful API endpoint to fetch transcripts in specified languages (English and Hindi by default) for a given YouTube video ID.

---

## Features

- Fetch YouTube video transcripts in multiple languages (English and Hindi by default).  
- Returns transcript data as JSON including:
  - `text` → the transcript text  
  - `duration` → duration of the segment in seconds  
  - `offset` → start time in seconds  
  - `lang` → language code  
- Handles cases where transcripts are unavailable for a specified language.  
- Simple and lightweight Express.js server.

---

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js (v16 or higher recommended)  
- npm (Node Package Manager)  
- A valid YouTube video ID for testing

---

## Installation

1. **Clone the repository** (or create a new project directory):

```bash
git clone https://github.com/jeevanms003/Youtube-Transcript-Fetcher
cd Youtube-Transcript-Fetcher
```

2. **Install dependencies:**

```bash
npm install express youtube-transcript-plus typescript @types/express @types/node
```

3. **Set up TypeScript:**

- Ensure a tsconfig.json file exists in the project root. If not, create one with the following content:

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["*.ts"],
  "exclude": ["node_modules"]
}
```

4. **Save the code:**

- Ensure the application code is saved as index.ts in the project directory.

---

## Usage
**Start the server**

- Compile the TypeScript code and run the server:

```cmd
npx ts-node index.ts
```

- The server will start at:

```cmd
http://localhost:3000
```

---

## Fetch a transcript

- Make a GET request to the /transcript endpoint with a url query parameter.

Example:

```cmd
curl "http://localhost:3000/transcript?url=https://www.youtube.com/watch?v=your_video_id_or_shorts_id"
```

- Replace your_video_id_or_shorts_id with a valid YouTube video ID or Shorts URL (e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ or https://www.youtube.com/shorts/dQw4w9WgXcQ).

--- 

## Response format

- The API returns a JSON object with the videoId and transcript data for each language:
```json
{
  "videoId": "dQw4w9WgXcQ",
  "transcript": {
    "en": [
      { "text": "Sample text", "duration": 2.5, "offset": 0, "lang": "en" }
    ],
    "hi": "Transcript not available in hi"
  }
}
```
---

## Error handling

- If `url` is not provided, the API returns a 400 status code:

```cmd
{ "error": "url query parameter is required" }
```
- If the URL is invalid or the video ID cannot be extracted:

```cmd
{ "error": "Invalid YouTube URL" }
```

- If a transcript is unavailable for a language, the response includes:

```json
"Transcript not available in <lang>"
```

---

## API Endpoint
```cmd
GET /transcript
```
---

## Query Parameter:

- `url` (string, required) – The full YouTube video URL (supports regular videos, Shorts, and youtu.be links).

- Example to fetch the transcript for a video:

```cmd
curl "http://localhost:3000/transcript?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ"
```
- Example for a Shorts URL:

```cmd
curl "http://localhost:3000/transcript?url=https://www.youtube.com/shorts/dQw4w9WgXcQ"
```
---

## Example Response:

```json
{
  "videoId": "dQw4w9WgXcQ",
  "transcript": {
    "en": [
      { "text": "Never gonna give you up", "duration": 2.5, "offset": 0, "lang": "en" }
    ],
    "hi": "Transcript not available in hi"
  }
}
```
