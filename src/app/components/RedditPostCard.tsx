'use client';
import { useEffect, useState } from 'react';

interface Post {
    subreddit: string;
    url: string;
    title: string;
    id: string;
    author: string;
    description: string;
    icon: string;
}

export default function RedditPostCard() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await fetch('/api/reddit');
                
                // First, let's see what we're actually getting
                const responseText = await response.text();
                // console.log('Raw response:', responseText);
                
                let data;
                try {
                    data = JSON.parse(responseText);
                } catch (jsonError) {
                    console.error('JSON parse error:', jsonError);
                    throw new Error(`Invalid JSON response: ${responseText.substring(0, 200)}...`);
                }
                
                // Check if response contains an error
                if (data.error) {
                    throw new Error(data.error);
                }
                
                // console.log('Parsed data:', data);
                data = data.slice(0,5);
                setPosts(data);
                
            } catch (err) {
                console.error('Error fetching posts:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch posts');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();

    }, []);

    if (loading) {
        return <div>Loading Reddit posts...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (posts.length === 0) {
        return <div>No posts found</div>;
    }

    return (
        <div className="space-y-6 my-2">
            {posts.map((post, index) => (
                <div key={index} className='mx-5'>
                    <div className="flex flex-col group relative bg-gray-800/60  border border-gray-700/50 hover:border-gray-600/70 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:scale-[1.02]">
                        <div className='flex flex-row items-center justify-between gap-3 mb-2'>
                            <div className='text-left flex flex-row gap-2 items-center'>
                                <div className='bg-white w-10 lg:max-w-14 rounded-full border border-white overflow-hidden'>
                                    <img src={post.icon} className="w-full h-full scale-70"/>
                                </div>
                                <div className=''>
                                    <h1 className='font-bold text-xs md:text-sm 2xl:text-lg'>{post.subreddit}</h1>
                                    <p className='font-medium text-xs text-gray-500'>Posted by {post.author}</p>
                                </div>
                            </div>
                            <div className='lg:max-w-[8rem] max-w-0 overflow-hidden'>
                                <a href={post.url} target="_blank">
                                <img src="/redditlogo.png" className='w-full'/>
                                </a>
                            </div>
                        </div>
                        <div>
                            <hr className="border-gray-700 mb-4"></hr>
                            <h1 className='font-semibold text-lg text-left'>{post.title}</h1>
                            <p className='mt-[0.5rem] text-left text-[0.8rem] text-gray-400'>{post.description}</p>
                        </div>
                        <div>
                            <a href={post.url} target="_blank">
                            <button className='mt-5 border rounded-2xl py-1 text-xs w-full cursor-pointer hover:border-orange-400 hover:text-[#f55330]'>View All Comments</button>
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        

    );
}