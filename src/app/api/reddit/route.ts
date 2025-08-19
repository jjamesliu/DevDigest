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

async function fetchWithFallback(url: string, headers: Record<string, string>) {
    const corsProxies = [
        '', // Direct request first
        'https://corsproxy.io/?',
        'https://cors-anywhere.herokuapp.com/',
        'https://api.allorigins.win/raw?url=',
    ];

    for (let i = 0; i < corsProxies.length; i++) {
        const proxy = corsProxies[i];
        const fullUrl = proxy ? `${proxy}${encodeURIComponent(url)}` : url;
        
        try {
            console.log(`Attempt ${i + 1}: Fetching from ${fullUrl}`);
            
            const response = await fetch(fullUrl, { 
                headers: proxy ? { 'User-Agent': 'Mozilla/5.0 Reddit Fetcher' } : headers,
                method: 'GET',
                cache: 'no-store'
            });

            if (response.ok) {
                return response;
            }
            
            console.log(`Attempt ${i + 1} failed with status: ${response.status}`);
        } catch (error) {
            console.log(`Attempt ${i + 1} failed with error:`, error);
        }
    }
    
    throw new Error('All fetch attempts failed');
}

export async function GET() {
    try {
        const keywords = [ 
            "AskProgramming",
        ];
        const query = keywords[Math.floor(Math.random() * keywords.length)];
        const url = `https://www.reddit.com/r/${query}/top.json?t=week&limit=10`;

        console.log('Fetching Reddit posts for:', query);
        
        const headers = {
            'User-Agent': 'Mozilla/5.0 (compatible; DevDigest/1.0; +https://dev-digest-pi.vercel.app)',
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'DNT': '1',
            'Connection': 'keep-alive',
        };
        
        const response = await fetchWithFallback(url, headers);
        const data: RedditApiResponse = await response.json();

        // Simple fallback for icon - don't let this fail the whole request
        let icon = '';
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            const aboutUrl = `https://www.reddit.com/r/${query}/about.json`;
            const iconResponse = await fetchWithFallback(aboutUrl, headers);
            const iconData = await iconResponse.json() as SubredditAboutResponse;
            icon = iconData.data.icon_img || '';
        } catch (iconError) {
            console.log('Could not fetch subreddit icon, continuing without it', iconError);
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

        console.log(`Successfully fetched ${posts.length} posts`);
        return NextResponse.json(posts);
        
    } catch (error) {
        console.error('Error fetching Reddit posts:', error);
        
        // Return mock data as fallback to prevent complete failure
        const mockPosts = [
            {
                subreddit: "AskProgramming",
                url: "https://reddit.com/r/AskProgramming",
                title: "Service temporarily unavailable - please try again later",
                id: "mock1",
                author: "system",
                description: "Reddit API is currently unavailable. This is a placeholder.",
                icon: "",
            }
        ];
        
        return NextResponse.json(mockPosts);
    }
}