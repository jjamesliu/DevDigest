import { NextResponse } from 'next/server';

interface DevPost {
    id: string;
    title: string;
    url: string;
    description: string;
    cover_image: string;
}


export async function GET() {
    const topics = ["python", "programming", "react", "webdev", "career"];
    const query = topics[Math.floor(Math.random() * topics.length)];
    const response = await fetch(`https://dev.to/api/articles?tag=${query}&per_page=5`);
    const data = await response.json();


    const posts = data.map((post: DevPost) => ({
        id: post.id,
        title: post.title,
        url: post.url,
        description: post.description,
        cover_image: post.cover_image,
    })
    );

    return NextResponse.json(posts);
}