'use client'

import { useSession } from "next-auth/react"
import LottiCat from '@/app/components/LottieCat'
import Denined from "../components/Deniend"

const Layout = ({children}: {children: React.ReactNode}) => {
    const { status } = useSession()

    if(status === 'loading') {
        return <LottiCat text={'읽어오고 있어요'}/>
    }
    if(status === 'unauthenticated') {
        return <Denined />
    }

    return (
        <div className="w-full h-full flex justify-center items-center">
            {children}
        </div>
    )
}

export default Layout