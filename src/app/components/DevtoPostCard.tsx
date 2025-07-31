import { useState, useEffect } from 'react';
export default function DevtoPostCard() {

    interface Post {
        id: string,
        title: string,
        url: string,
        description: string,
        cover_image: string,
    }

    const [forumPost, setForumPost] = useState<Post[]>([]);
    useEffect(()=> {
        fetch('/api/devto/')
        .then(res => res.json())
        .then(data => {
            setForumPost(data)
            console.log(data)
        }
        );

    }, []);

    return (
        <div className='space-y-6 my-2'>
        {forumPost.map((post) => (
            <div key={post.id} 
            className="mx-5 text-left relative bg-gray-800/60 border border-gray-700/50 hover:border-gray-600/70 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:scale-[1.02]">
                <a href={post.url} target="_blank">
                    <div className='bg-red-200 max-h-full rounded-2xl overflow-hidden mb-4'>
                        <img className="w-full h-full object-contain" src={post.cover_image}/>
                    </div>
                    <h1 className='text-sm lg:text-lg'>{post.title}</h1>
                    <p className='text-gray-400 mt-1 text-xs sm:text-sm lg:text-md'>{post.description}</p>
                    <p className='whitespace-nowrap text-xs lg:text-sm mx-auto mt-4 py-1 px-10 md:px-30 border rounded-xl w-full text-center hover:scale-110 duration-300 hover:shadow-xl hover:bg-[#f3f3f3] hover:text-black'>Read More</p>
                </a>
            </div>
        ))}
        </div>
    )
}