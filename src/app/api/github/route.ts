import { NextResponse } from 'next/server';


export async function GET() {
    const response = await fetch('https://api.github.com/search/repositories?q=stars:%3E10000&sort=stars&order=desc&per_page=5',
     {
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
     });

     const data = await response.json();
     console.log(data);
     console.log(data.items);
     return NextResponse.json(data.items);
     
    
    
    }