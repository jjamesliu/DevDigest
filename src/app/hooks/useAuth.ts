import {useState, useEffect} from 'react';
import {supabase} from '@/lib/supabase';
import type { Session } from '@supabase/supabase-js';
type User = Session['user'];

export const useAuth = () => {
    const [userInfo, setUserInfo] = useState<User | null>(null);
    useEffect(()=> {
        const getInitialSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUserInfo(session?.user ?? null);
        };
        getInitialSession();

        const { data: {subscription}} = supabase.auth.onAuthStateChange((event, session) => {
            setUserInfo(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    return {
        user: userInfo,
        userName: userInfo?.user_metadata?.name,
        userEmail: userInfo?.email,
        signOut,
        isAuthenticated: !!userInfo
    };
};