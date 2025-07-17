'use client';
import { useEffect, useState } from 'react';

interface Post {
    url: string,
    title: string,
    id: string,
}

export default function RedditPostCard() {
    const [posts, setPosts] = useState<Post[]>([]);
    
    useEffect(() => {
        fetch('/api/reddit')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setPosts(data)
        })
    }, []);

    return (
        <div>
                {posts.map((post, index) => (
                    <h1 key={index}>the video title is {post.title} url is {post.url}</h1>
                ))}

        </div>
    )
}