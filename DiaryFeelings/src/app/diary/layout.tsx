"use client"

import { useSession } from "next-auth/react";
import Denined from "../components/Deniend";


const Layout = ({children}: {children: React.ReactNode}) => {
    const { status } = useSession();
    if(status === 'loading') {
        return <></>
    }
    if(status === 'unauthenticated') {
        return <Denined />
    }
    return (
        <>
            {
                children
            }
        </>
    )
};

export default Layout;