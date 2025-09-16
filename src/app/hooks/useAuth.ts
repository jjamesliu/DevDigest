import {useState, useEffect} from 'react';
import {supabase} from '@/lib/supabase';
import {User, Session} from '@supabase/supabase-js';



export const useAuth = () => {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const [user, setUser] = useState<User | null>(null);
   const [session, setSession] = useState<Session | null>(null);

   useEffect(() => {
    const getCurrentSession = async () => {
        const session = await supabase.auth.getSession();

        const userData = session?.data?.session?.user;
        const sessionData = session?.data.session;
        console.log(userData);
        console.log(sessionData);
        setUser(userData  || null);
        setSession(sessionData);
        console.log('This is the useeffect session in the hook')
        console.log(user);
    }
    getCurrentSession();

    //  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    //     (event, session) => {
    //         console.log("Auth state changed:", event, session);
    //         setSession(session);
    //         setUser(session?.user || null);
    //     }
    // );

    // return () => subscription.unsubscribe();
   }, []);


   const signUp = async (email: string, password: string, name:string) => { //1
        setLoading(true);
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
        setLoading(false);
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
        console.log("there was an error")
        return {sucess: false, error: result.error}
     }
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
    userName: user?.user_metadata.name,
    isAuthenticated: !!user,
    signUp,
    signIn,
    signOut,

   };
};