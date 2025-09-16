'use client'
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import {motion} from 'framer-motion';
import { supabase } from '@/lib/supabase';
import {useAuth} from '@/hooks/useAuth'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();
    const {signIn} = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    // const router = useRouter();
    const [message, setMessage] = useState('');
    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    

    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault()
        console.log("Submit button clicked");
        try {
            const result = await signIn(formData.email, formData.password);
        } catch (error) {
            console.error("there was an error with tryin to execute the signin function")
        }



        // try { 
        //     const result = await supabase.auth.signInWithPassword({
        //         email: formData.email,
        //         password: formData.password
        //     });
        //     if (result.error) {
        //         console.log(`an error occured while trying to log in ${result.error.message}`);
        //         setMessage("Wrong Email or Password.");
        //     } else {
        //         console.log(`login successful. your username is ${formData.email}`);
        //         setMessage('You have logged in successfully.');
        //         setFormData({
        //         email: '',
        //         password: ''
        //         });
        //         setTimeout(()=> {
        //             router.push('/');
        //         }, 1000);
        //     }
        // } catch (error) {
        //     console.log(`there was an error: ${error}`);
        // }
    }





    return (
        <motion.div className='max-w-xl rounded-lg mx-auto mt-40 py-20 px-5 '
        initial={{ y: 0, opacity: 0 }}      
        animate={{ y: 0, opacity: 1 }}       
        transition={{
          duration: 1,
          ease: 'easeOut',
        }}>
            <div className='flex flex-col border rounded-xl p-10'>
                <Link href='/' className='w-fit h-fit'>
                    <div className='flex flex-row gap-1 text-sm items-center hover:text-blue-400 duration-300 cursor-pointe'>
                        <ArrowLeft className='w-5' />
                        <span>Back to Home</span>
                    </div>
                </Link>

                <h1 className='text-center font-bold text-xl sm:text-2xl mt-10'> Login to your account</h1>
                <form className='w-full space-y-10 mt-10 flex flex-col pb-8'
                onSubmit={handleSubmit}>
                        <div className='space-y-1'>
                            <p className='text-sm pl-1 text-gray-300'>
                                Email
                            </p>
                            <input type='email'
                            name='email'
                            onChange={handleChange}
                            value={formData.email}
                            required
                            placeholder="Email address"
                            className='border w-full px-2 py-1 rounded-lg'/>
                        </div>
                        <div className='space-y-1'>
                            <p className='text-sm pl-1 text-gray-300'>
                                Password
                            </p>
                            <input type='password'
                            name='password'
                            onChange={handleChange}
                            value={formData.password}
                            required
                            placeholder="Password"
                            className='border w-full px-2 py-1 rounded-lg'/>
                        </div>
                        <button type="submit"
                         className='px-6 py-2 border rounded-xl w-full mx-auto font-medium text-black cursor-pointer bg-white hover:bg-white/80 duration-200'>Login</button>
                        {message &&
                        <p className={`text-center ${message.includes("Wrong") ? 'text-red-500' : 'text-green-300'}`}>{message}</p>
                        }
                        <Link href="/signup">
                            <div className='text-center hover:opacity-75'>
                                <span className='text-center text-sm duration-300 cursor-pointer'>Don&apos;t have an account?</span>{' '}
                                <span className='text-blue-300 text-sm font-semibold'>Sign up</span>
                            </div>
                        </Link>
                </form>
            </div>
        </motion.div>
    )
}