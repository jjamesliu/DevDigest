'use client'; 
import { motion } from 'framer-motion';
import Header from './components/Header';




export default function Home() {
  return (
    <>
    <Header />
    
    <div className='flex justify-center mt-16'>
      <motion.h1
        className="font-bold text-3xl"
        initial={{ y: -250, opacity: 0 }}      
        animate={{ y: 0, opacity: 1 }}       
        transition={{
          duration: 0.6,
          ease: 'easeOut',
        }}
      >
        Welcome to Dev Digest
      </motion.h1>
    </div>
    </>
  );
}
