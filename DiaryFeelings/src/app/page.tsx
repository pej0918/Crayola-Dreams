'use client'

import { useSession } from 'next-auth/react'
import React from 'react'
import NotLoginMain from './components/NotLoginMain'
import { useRouter } from 'next/navigation'

const UsersPage = () => {
    const { status } = useSession()
    const router = useRouter()
    if (status === 'loading') {
        return <></>
    }
    if (status === 'unauthenticated') {
        return <NotLoginMain />
    }
    if (status === 'authenticated') {
        return router.push('/diary?page=1')
    }
    return (
        <div>
            <main></main>
        </div>
    )
}

export default UsersPage
