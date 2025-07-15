'use client'; 
import { motion } from 'framer-motion';

export default function Header() {
    return (
        <motion.div className="mt-4 flex items-center justify-between mx-auto max-w-xl rounded-full px-4 py-2 bg-[#161616] backdrop-blur-lg border border-white/20 "
         initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.4,
                scale: { type: "spring", visualDuration: 0.4, bounce: 0.3 },
            }}>
            <img src='/newspaper.svg' alt='newspaper brand logo' className="w-[2.3rem]" />
            <button className='rounded-full bg-[#363636] px-[1rem] py-[0.3rem] shadow-xl cursor-pointer hover:bg-white/30 hover:scale-105 transition-all duration-200'>Login</button>
        </motion.div>
    )
}