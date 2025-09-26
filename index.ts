import express, { Request, Response } from "express";
const { fetchTranscript } = require("youtube-transcript-plus");

const app = express();
const PORT = 3000;

// Type definition for transcript segment
type TranscriptSegment = {
  text: string;
  duration: number;
  offset: number;
  lang: string;
};

// Helper function to extract video ID from any YouTube URL (regular or Shorts)
function extractVideoId(url: string): string | null {
  const shortRegex = /youtube\.com\/shorts\/([\w-]{11})/;
  const watchRegex = /youtube\.com\/watch\?v=([\w-]{11})/;
  const youtuBeRegex = /youtu\.be\/([\w-]{11})/;

  let match = url.match(shortRegex);
  if (match) return match[1];

  match = url.match(watchRegex);
  if (match) return match[1];

  match = url.match(youtuBeRegex);
  if (match) return match[1];

  return null;
}

app.get("/transcript", async (req: Request, res: Response) => {
  const url = req.query.url as string;
  if (!url) {
    return res.status(400).json({ error: "url query parameter is required" });
  }

  const videoId = extractVideoId(url);
  if (!videoId) {
    return res.status(400).json({ error: "Invalid YouTube URL" });
  }

  const desiredLanguages = ["en", "hi"];
  const result: Record<string, TranscriptSegment[] | string> = {};

  for (const lang of desiredLanguages) {
    try {
      const transcript: TranscriptSegment[] = await fetchTranscript(videoId, { lang });
      result[lang] = transcript;
    } catch (error: any) {
      result[lang] = `Transcript not available in ${lang}`;
    }
  }

  res.json({
    videoId,
    transcript: result,
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
