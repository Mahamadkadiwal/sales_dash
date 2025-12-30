import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { getCurrentAdmin, getCurrentUser } from '../_lib/localStorage';

export default function ProtectedRoute({children, role}: {
    children: React.ReactNode,
    role: 'admin' | 'user'
}) {
    const router = useRouter();
    const [allowed, setAllowed] = useState(false);

    useEffect(() => {
        const admin = getCurrentAdmin();
        const user = getCurrentUser();

        if(role === 'admin' && admin) setAllowed(true);
        else if(role === 'user' && user) setAllowed(true);
        else router.replace('/auth/signIn');

    }, []);

    if(!allowed){
        return null;
    }
    return children;
}
