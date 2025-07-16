import { NextResponse } from 'next/server';


export async function GET() {
    const query = "computer science web development"
    const results = 5;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&maxResults=${results}&key=${process.env.YOUTUBE_TOKEN}`;
    const response = await fetch(url);
    const data = await response.json();

    const videos = data.items.map((item:any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        channel: item.snippet.channelTitle,
        link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));

    return NextResponse.json(videos);
}