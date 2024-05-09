"use client"

import { useSession } from "next-auth/react"
import Denined from "../components/Deniend";
import LottieCat from '../components/LottieCat';

const Layout = ({children} : {children: React.ReactNode}) => {
    const { status } = useSession();

    if(status === 'loading') {
        return <LottieCat text={'읽어오고 있어요'}/>
    }
    if(status === 'unauthenticated') {
        return <Denined />
    }
    return (
        <div className="w-full flex justify-center items-center p-[7px]">
            {children}
        </div>
    )
}

export default Layout