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
        .then(data => {
            console.log(data)
            setVideos(data)
    })
    }, []);

    return (
        <div className='group relative bg-gray-800/60 hover:bg-gray-800/80 border border-gray-700/50 hover:border-gray-600/70 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:scale-[1.02]'>
            {videos.map(video => (
                <a key={video.id}
                href={video.link}
                target="_blank"
                rel="noopener noreferrer">
                    <img src={video.thumbnail}
                    alt={video.title}
                    className='w-full rounded-xl'></img>
                    <h3 className='mt-4 font-bold'>{video.title}</h3>
                </a>
            ))}
        </div>
    )

}