'use client'; 
import { motion } from 'framer-motion';
import Header from './components/Header';
import GithubPostCard from './components/GitHubPostCard';
import YoutubePostCard from './components/YoutubePostCard';
import RedditPostCard from './components/RedditPostCard';
import DevtoPostCard from './components/DevtoPostCard';


export default function Home() {
  return (
    <>
    <Header />
    
    <div className='flex flex-col justify-center mt-32 mb-40 px-8'>
      <motion.h1
        className="font-semibold text-2xl leading-[2.3rem] text-center "
        initial={{ y: 0, opacity: 0 }}      
        animate={{ y: 0, opacity: 1 }}       
        transition={{
          duration: 1.5,
          ease: 'easeOut',
        }}
      >
        Welcome 👋
      </motion.h1>
      <motion.p
        className="font-md text-2xl leading-[2.3rem] text-center text-[#d1d1d1]"
        initial={{ y: 0, opacity: 0 }}      
        animate={{ y: 0, opacity: 1 }}       
        transition={{
          duration: 1.5,
          ease: 'easeOut',
        }}
      >
      Here’s your personalized dev feed for today
      </motion.p>
    </div>

{/* PostCard Articles */}
    <div className='grid grid-cols-1 xl:grid-cols-2 gap-20 max-w-[75%] mx-auto text-center my-20 '>
      <div className=' p-8 rounded-xl max-h-[68rem] bg-[#222222]/30 shadow-[0_0_20px_15px_rgba(255,255,255,0.08)] shadow-black/50'>
        <h1 className='font-semibold text-xl mb-8'>Github Trends</h1>
        <GithubPostCard />
      </div>


      <div className='flex flex-col p-8 rounded-xl max-h-[68rem] bg-[#222222]/30 shadow-[0_0_20px_15px_rgba(255,255,255,0.08)] shadow-black/50'>
        <h1 className='font-semibold text-xl mb-8'>Youtube Dev Videos</h1>
        <div className='flex-1 overflow-y-auto scrollbar-black'>
          <YoutubePostCard />
        </div>
      </div>

      <div className='flex flex-col max-h-[90rem] p-8 rounded-xl  bg-[#222222]/30 shadow-[0_0_20px_15px_rgba(255,255,255,0.08)] shadow-black/50 '>
        <h1 className='font-semibold text-xl mb-8'>Reddit Discussions</h1>
        <div className='flex-1 overflow-y-auto scrollbar-black'>
          <RedditPostCard />
        </div>
      </div>


      <div className='flex flex-col max-h-[90rem] p-8 rounded-xl  bg-[#222222]/30 shadow-[0_0_20px_15px_rgba(255,255,255,0.08)] shadow-black/50  '>
        <h1 className='font-semibold text-xl mb-8'>Latest Blog Articles</h1>
        <div className='flex-1 overflow-y-auto scrollbar-black'>
          <DevtoPostCard/>
        </div>
      </div>
    </div>

    </>
  );
}
