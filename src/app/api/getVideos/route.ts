import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req:Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search";

    if (!query) {
      return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
    }

    const response = await axios.get(YOUTUBE_BASE_URL, {
      params: {
        part: "snippet",
        q: query,
        maxResults: 1,
        type:"video",
        videoDuration:'medium',
        key: API_KEY,
      },
    });
    // console.log(response.data.items)
    return NextResponse.json(response.data.items);
  } catch (error) {
    console.error("YouTube API error:", error);
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 });
  }
}
