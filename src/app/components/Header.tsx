'use client'; 
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function Header() {
    const {user, userName, signOut, isAuthenticated} = useAuth();
    const handleAuthAction = () => {
        if (isAuthenticated) {
            signOut();
            console.log("signed out buttun clicked")
        } else {
            console.log("sign in button clicked")
        }
    }

    return (
        <div className='px-4'>
            <motion.div className="mt-4 flex items-center justify-between mx-auto max-w-sm md:max-w-2xl lg:max-w-4xl rounded-full px-4 py-2 bg-[#161616] backdrop-blur-lg border border-white/20"
             initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.4,
                    scale: { type: "spring", visualDuration: 0.4, bounce: 0.3 },
                }}>
                <img src='/newspaper.svg' alt='newspaper brand logo' className="w-[2.3rem]" />
                <Link href="/login">
                    <button className='rounded-full bg-[#363636] px-[1rem] py-[0.3rem] shadow-xl cursor-pointer hover:bg-white/30 hover:scale-105 transition-all duration-200'
                    onClick={handleAuthAction}>
                        {isAuthenticated ? `Sign out ${userName}` : 'Login'}
                    </button>
                </Link>
            </motion.div>
        </div>
    )
}