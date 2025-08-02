import {useState, useEffect} from 'react';
import {supabase} from '@/lib/supabase';

export const useAuth = () => {
    const [userInfo, setUserInfo] = useState<any>(null);
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
        userName: userInfo?.raw_user_meta_data?.name,
        userEmail: userInfo?.email,
        signOut,
        isAuthenticated: !!userInfo
    };
};