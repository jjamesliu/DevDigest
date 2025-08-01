'use client'
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import {supabase}  from '@/lib/supabase';
import {useState} from 'react';
// import { useRouter } from 'next/navigation';

export default function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    // const router = useRouter();
    const [message, setMessage] = useState('');

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();
        console.log("Submit button clicked.")
        try {
            const result = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        name: formData.name,
                    }
                }
            });
            if (result.error) {
                console.log(result.error.message);
            } else {
                console.log(`Check your email which is ${formData.email} for a confirmation link.`);
            }
            setMessage('Sign up successful!');
            setFormData({
                name: '',
                email: '',
                password: ''
            });
        } catch (error) {
            console.log(`Error occured, ${error}`)
        }
    };

    return (
        <motion.div className='max-w-xl rounded-lg mx-auto mt-40 py-20 px-10'
        initial={{ y: 0, opacity: 0 }}      
        animate={{ y: 0, opacity: 1 }}       
        transition={{
          duration: 1,
          ease: 'easeOut',
        }}>
            <div className='flex flex-col border rounded-xl p-10'>
                <Link href='/'>
                    <div className='flex flex-row gap-1 text-sm items-center mb-10 hover:text-blue-400 duration-300 cursor-pointer'>
                        <ArrowLeft className='w-5' />
                        <p>Back to Home</p>
                    </div>
                </Link>
                <h1 className='text-center font-bold text-xl sm:text-2xl'>Create an account</h1>
                <form className='w-full space-y-5 mt-10 flex flex-col pb-8'
                onSubmit={handleSubmit}>
                        <div className='space-y-1'>
                            <p className='text-sm pl-1 text-gray-300'>
                                Name
                            </p>
                            <input type='text'
                            name="name"
                            value={formData.name}
                            required
                            onChange={handleChange}
                            placeholder="Enter Your Name"
                            className='border w-full px-2 py-1 rounded-lg'/>
                        </div>
                        <div className='space-y-1'>
                            <p className='text-sm pl-1 text-gray-300'>
                                Email
                            </p>
                            <input type='email'
                            name="email"
                            value={formData.email}
                            required
                            onChange={handleChange}
                            placeholder="Email address"
                            className='border w-full px-2 py-1 rounded-lg'/>
                        </div>
                        <div className='space-y-1'>
                            <p className='text-sm pl-1 text-gray-300'>
                                Password
                            </p>
                            <input type='password'
                            name="password"
                            value={formData.password}
                            required
                            onChange={handleChange}
                            placeholder="Password"
                            className='border w-full px-2 py-1 rounded-lg'/>
                        </div>
                        <button type="submit"
                         className='mt-5 px-6 py-2 border rounded-xl w-full mx-auto font-medium text-black cursor-pointer bg-white hover:bg-white/80 duration-200'>Sign up</button>
                         {message && 
                         <p className='text-green-300 text-center'>
                            {message}
                        </p>}
                        <Link href="/login">
                            <div className='text-center hover:underline hover:text-blue-400'>
                                <span className='text-center text-sm duration-300 cursor-pointer'>Already have an account?</span>{' '}
                                <span className='text-blue-300 text-sm font-semibold'>Login</span>
                            </div>
                        </Link>
                </form>
            </div>
        </motion.div>
    )
}