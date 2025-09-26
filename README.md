YouTube Transcript FetcherYouTube Transcript Fetcher is a simple Node.js application built with Express.js that retrieves transcripts for YouTube videos using the `youtube-transcript-plus` library.
The application exposes a RESTful API endpoint to fetch transcripts in specified languages (English and Hindi by default) for a given YouTube video ID.FeaturesFetch YouTube video transcripts in multiple languages (English and Hindi by default).  
Returns transcript data as JSON including:  text → the transcript text  
duration → duration of the segment in seconds  
offset → start time in seconds  
lang → language code

Handles cases where transcripts are unavailable for a specified language.  
Simple and lightweight Express.js server.

PrerequisitesBefore running the application, ensure you have the following installed:  Node.js (v16 or higher recommended)  
npm (Node Package Manager)  
A valid YouTube video ID for testing

InstallationClone the repository (or create a new project directory):  bash

git clone <your-repo-url>
cd yt-transcript

Install dependencies:  Run the following command to install the required npm packages:  bash

npm install express youtube-transcript-plus typescript @types/express @types/node

Set up TypeScript:  Ensure a tsconfig.json file exists in the project root. If not, create one with the following content:  json

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

Save the code:  Ensure the application code is saved as index.ts in the project directory.

UsageStart the server:  Compile the TypeScript code and run the server:  bash

npx tsc
node dist/index.js

The server will start at http://localhost:3000.  
Fetch a transcript:  Make a GET request to the /transcript endpoint with a videoId query parameter. For example:  bash

curl "http://localhost:3000/transcript?videoId=your_video_id"

Replace your_video_id with a valid YouTube video ID (e.g., dQw4w9WgXcQ).  
Response format:  The API returns a JSON object with transcript data for each language:  json

{
  "en": [
    { "text": "Sample text", "duration": 2.5, "offset": 0, "lang": "en" },
    ...
  ],
  "hi": "Transcript not available in hi"
}

Error handling:  If videoId is not provided, the API returns a 400 status code with:  json

{ "error": "videoId query parameter is required" }

If a transcript is unavailable for a language, the response includes a message like "Transcript not available in <lang>".

API EndpointGET /transcript  Query Parameter: videoId (string, required) - The YouTube video ID.  
Response: JSON object containing transcript data or error messages for each language.

ExampleTo fetch the transcript for a video with ID dQw4w9WgXcQ:  bash

curl "http://localhost:3000/transcript?videoId=dQw4w9WgXcQ"

Example response:  json

{
  "en": [
    { "text": "Never gonna give you up", "duration": 2.5, "offset": 0, "lang": "en" },
    ...
  ],
  "hi": "Transcript not available in hi"
}

