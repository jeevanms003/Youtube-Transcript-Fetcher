import express, { Request, Response } from "express";
const { fetchTranscript } = require("youtube-transcript-plus");

const app = express();
const PORT = 3000;

type TranscriptSegment = {
  text: string;
  duration: number;
  offset: number;
  lang: string;
};

app.get("/transcript", async (req: Request, res: Response) => {
  const videoId = req.query.videoId as string;

  if (!videoId) {
    return res.status(400).json({ error: "videoId query parameter is required" });
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

  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
