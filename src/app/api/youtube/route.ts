import { NextResponse } from 'next/server';

// Define interfaces for YouTube API response structure
interface YouTubeVideoId {
    videoId: string;
}

interface YouTubeThumbnail {
    url: string;
    width: number;
    height: number;
}

interface YouTubeThumbnails {
    medium: YouTubeThumbnail;
    high?: YouTubeThumbnail;
    default?: YouTubeThumbnail;
}

interface YouTubeSnippet {
    title: string;
    channelTitle: string;
    thumbnails: YouTubeThumbnails;
}

interface YouTubeVideoItem {
    id: YouTubeVideoId;
    snippet: YouTubeSnippet;
}

interface YouTubeApiResponse {
    items: YouTubeVideoItem[];
}

export async function GET() {
    try {
        const keywords = [
            "web development",
            "javascript tutorial",
            "react js",
            "nodejs",
            "css tips",
            "html5",
            "typescript",
            "frontend development",
            "backend development",
            "full stack development",
            "programming tutorial",
            "coding bootcamp",
            "web design",
            "responsive design",
            "javascript frameworks",
            "vue js",
            "angular",
            "express js",
            "mongodb",
            "sql database",
            "git tutorial",
            "api development",
            "web performance",
            "debugging techniques",
            "software engineering"
        ];

        const query = keywords[Math.floor(Math.random() * keywords.length)];
        const results = 5;
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&maxResults=${results}&key=${process.env.YOUTUBE_TOKEN}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`YouTube API responded with status: ${response.status}`);
        }
        
        const data = await response.json() as YouTubeApiResponse;

        const videos = data.items.map((item: YouTubeVideoItem) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.medium.url,
            channel: item.snippet.channelTitle,
            link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        }));

        return NextResponse.json(videos);
        
    } catch (error) {
        console.error('Error fetching YouTube videos:', error);
        return NextResponse.json(
            { error: 'Failed to fetch YouTube videos' }, 
            { status: 500 }
        );
    }
}