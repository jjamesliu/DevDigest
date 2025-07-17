import { NextResponse } from 'next/server';

export async function GET() {
    const keywords =[ 
        "AskProgramming",
        "csMajors",
        "computerscience"
    ];
    const query = keywords[Math.floor(Math.random() * keywords.length)];
    const url = `https://www.reddit.com/r/${query}/top.json?t=week`

    const response = await fetch(url);
    const data = await response.json();
    const posts = data.data.children.map((post:any) => post.data.url)
    
    return NextResponse.json(posts);
    
}