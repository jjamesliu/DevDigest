'use client'; 
import { motion } from 'framer-motion';
import Header from './components/Header';
import GithubPostCard from './components/GitHubPostCard';




export default function Home() {
  return (
    <>
    <Header />
    
    <div className='flex flex-col justify-center mt-16 mb-24'>
      <motion.h1
        className="font-semibold text-2xl leading-[2.3rem] text-center "
        initial={{ y: 0, opacity: 0 }}      
        animate={{ y: 0, opacity: 1 }}       
        transition={{
          duration: 2,
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
          duration: 2,
          ease: 'easeOut',
        }}
      >
      Here’s your personalized dev feed for today
      </motion.p>
    </div>

{/* PostCard Articles */}
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mx-12 text-center'>
      <div className=' '>
        <h1>Github Trends</h1>
        <GithubPostCard />

      </div>
      <div className=' '>
        <h1>YouTube Dev Videos</h1>

      </div>
      <div className=' '>
        <h1>Reddit Discussions</h1>

      </div>
      <div className=' '>
        <h1>Latest Blog Articles</h1>

      </div>
    </div>




    </>
  );
}
