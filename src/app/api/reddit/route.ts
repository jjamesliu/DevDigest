import { NextResponse } from 'next/server';

interface RedditPost {
    data: {
        subreddit: string;
        url: string;
        title: string;
        id: string;
        author: string;
        selftext: string;
    };
}

interface RedditApiResponse {
    data: {
        children: RedditPost[];
    };
}

interface SubredditAboutResponse {
    data: {
        icon_img: string;
    };
}

export async function GET() {
    try {
        const keywords = [ 
            "AskProgramming",
        ];
        const query = keywords[Math.floor(Math.random() * keywords.length)];
        let url = `https://www.reddit.com/r/${query}/top.json?t=week&limit=10`;

        console.log('Fetching from URL:', url);
        
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; DevDigest/1.0; +https://yoursite.com)',
                'Accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate',
                'Connection': 'keep-alive',
            },
        });

        console.log('Reddit API response status:', response.status);
        console.log('Reddit API response headers:', Object.fromEntries(response.headers.entries()));

        const responseText = await response.text();
        console.log('Raw Reddit response (first 1000 chars):', responseText.substring(0, 1000));

        if (!response.ok) {
            console.error('Reddit API error - Status:', response.status);
            console.error('Reddit API error - Full response:', responseText);
            throw new Error(`Reddit API responded with status: ${response.status}, body: ${responseText.substring(0, 200)}`);
        }

        console.log('Raw Reddit API response:', responseText.substring(0, 500));
        
        let data: RedditApiResponse;
        try {
            data = JSON.parse(responseText) as RedditApiResponse;
        } catch (parseError) {
            console.error('Failed to parse Reddit response as JSON:', parseError);
            throw new Error(`Invalid JSON from Reddit API: ${responseText.substring(0, 200)}`);
        }

        //to get subreddit image
        url = `https://www.reddit.com/r/${query}/about.json`
        const response2 = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; DevDigest/1.0; +https://yoursite.com)',
                'Accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate',
                'Connection': 'keep-alive',
            },
        });
        const data2 = await response2.json() as SubredditAboutResponse;
        const icon = data2.data.icon_img;

        const posts = data.data.children.map((post: RedditPost) => ({
            subreddit: post.data.subreddit,
            url: post.data.url,
            title: post.data.title,
            id: post.data.id,
            author: post.data.author,
            description: post.data.selftext,
            icon: icon,
        }));

        console.log('Fetched posts:', posts);
        return NextResponse.json(posts);
        
    } catch (error) {
        console.error('Error fetching Reddit posts:', error);
        return NextResponse.json(
            { error: 'Failed to fetch Reddit posts' }, 
            { status: 500 }
        );
    }
}