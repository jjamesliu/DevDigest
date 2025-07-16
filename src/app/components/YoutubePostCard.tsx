'use client';
import { useEffect, useState } from 'react';

interface Video {
    id: string;
    title: string;
    thumbnail: string;
    channel: string;
    link: string;
};

export default function YoutubePostCard() {
    const [videos, setVideos] = useState<Video[]>([]);

    useEffect(() => {
        fetch('api/youtube')
        .then(res => res.json())
        .then(data => setVideos(data))
    }, []);

    return (
        <div>
            {videos.map(video => (
                <a key={video.id}
                href={video.link}
                target="_blank"
                rel="noopener noreferrer">
                    <img src={video.thumbnail}
                    alt={video.title}></img>
                    <h3 className='text-white font-semibiold'>{video.title}</h3>
                </a>
            ))}
        </div>
    )

}