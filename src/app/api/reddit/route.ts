import { NextResponse } from 'next/server';

export async function GET() {
    const keywords =[ 
        "AskProgramming",
        "csMajors",
        "computerscience"
    ];
    const query = keywords[Math.floor(Math.random() * keywords.length)];
    const url = `https://www.reddit.com/r/${query}/top.json?t=week`

    const response = await fetch(url, {
        headers: {
            'User-Agent': 'DevDigest/1.0 (Web Development Content Aggregator)',
        },
        });
        
    const data = await response.json();
    const posts = data.data.children.map((post:any) => ({
        url: post.data.url,
        title: post.data.title,
        id: post.data.id,
    }));

    console.log(posts);
    return NextResponse.json(posts);
    
}