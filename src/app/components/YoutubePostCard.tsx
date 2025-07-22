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
        <div className='space-y-6 my-2'>
            {videos.map(video => (
                <div key={video.id} className=' mx-auto group relative flex flex-col items-center w-full max-w-[85%] bg-gray-800/60 hover:bg-gray-800/80 border border-gray-700/50 hover:border-gray-600/70 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:scale-[1.02]'>
                    <div className='w-full'>
                        <a key={video.id}
                        href={video.link}
                        target="_blank"
                        rel="noopener noreferrer">
                        <div className='relative w-full aspect-video bg-gray-700 rounded-xl overflow-hidden group'>
                            <img src={video.thumbnail}
                            alt={video.title}
                            className='absolute inset-0 w-full h-full object-cover'></img>
                            
                            {/* Play Button Overlay */}
                            <div className='absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-all duration-300'>
                                <div className='w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300'>
                                    <svg 
                                        className='w-7 h-7 text-white' 
                                        fill='currentColor' 
                                        viewBox='0 0 24 24'
                                    >
                                        <path d='M8 5v14l11-7z'/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                            <h3 className='mt-4 font-bold'>{video.title}</h3>
                        </a>
                    </div>
                </div>
            ))}
        </div>
    )
}