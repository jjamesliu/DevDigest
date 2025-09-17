import {useState, useEffect} from 'react';
import {supabase} from '@/lib/supabase';
import {User, Session} from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';


export const useAuth = () => {
    const router = useRouter();
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const [user, setUser] = useState<User | null>(null);
   const [session, setSession] = useState<Session | null>(null);

   useEffect(() => {
    const getCurrentSession = async () => {
        setLoading(true);
        const session = await supabase.auth.getSession();

        const userData = session?.data?.session?.user;
        const sessionData = session?.data.session;
        console.log("This is userData from useAuth hook useEffect: ",  userData);
        console.log("This is sessionData from useAuth hook useEffect: ", sessionData);
        setUser(userData  || null);
        setSession(sessionData);
        setLoading(false);
    }
    getCurrentSession();

   }, []);


   const signUp = async (email: string, password: string, name:string) => { //1
        const {data, error} = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {name}
            }
        })
        if (error) {
            setError(error.message);
            return {success: false, error: error.message}
        }
        return {success: true, data: data}
   };

   const signIn = async (email: string, password: string) => { //2
    try {
     const result = await supabase.auth.signInWithPassword({
        email,
        password
     })
     setUser(result.data.user);
     setSession(result.data.session);
     if (result.error) {
        console.log("there was an error");
        return {sucess: false, error: result.error}
     }
     router.push("/")
     return {success: true, data: result.data}
    } catch (error) {
        console.error('There was an error trying to run the sign in function.')
    }
   }

    const signOut = async () => {
        await supabase.auth.signOut();
    };


   return {
    user,
    session,
    loading,
    userName: user?.user_metadata.name,
    isAuthenticated: !!user,
    signUp,
    signIn,
    signOut,

   };
};