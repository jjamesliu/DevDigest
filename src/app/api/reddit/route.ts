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
        // Fixed: Changed liamit to limit, and using .json endpoint directly
        let url = `https://www.reddit.com/r/${query}/top.json?t=week&limit=10`;

        console.log('Fetching from URL:', url);
        
        // Simplified headers - Reddit's JSON feeds are more permissive
        const headers = {
            'User-Agent': 'DevDigest/1.0',
            'Accept': 'application/json',
        };
        
        const response = await fetch(url, { 
            headers,
            // Add these options for better reliability
            method: 'GET',
            cache: 'no-store'
        });

        console.log('Reddit API response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Reddit API error - Status:', response.status);
            console.error('Reddit API error - Response:', errorText);
            throw new Error(`Reddit API responded with status: ${response.status}`);
        }

        const data: RedditApiResponse = await response.json();

        // Add delay before second request
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Get subreddit icon
        const aboutUrl = `https://www.reddit.com/r/${query}/about.json`;
        let icon = '';
        
        try {
            const response2 = await fetch(aboutUrl, { 
                headers,
                method: 'GET',
                cache: 'no-store'
            });
            
            if (response2.ok) {
                const data2 = await response2.json() as SubredditAboutResponse;
                icon = data2.data.icon_img || '';
            }
        } catch (iconError) {
            console.log('Failed to fetch subreddit icon, continuing without it:', iconError);
        }

        const posts = data.data.children.map((post: RedditPost) => ({
            subreddit: post.data.subreddit,
            url: post.data.url,
            title: post.data.title,
            id: post.data.id,
            author: post.data.author,
            description: post.data.selftext,
            icon: icon,
        }));

        console.log('Fetched posts:', posts.length);
        return NextResponse.json(posts);
        
    } catch (error) {
        console.error('Error fetching Reddit posts:', error);
        return NextResponse.json(
            { error: 'Failed to fetch Reddit posts', details: error instanceof Error ? error.message : 'Unknown error' }, 
            { status: 500 }
        );
    }
}