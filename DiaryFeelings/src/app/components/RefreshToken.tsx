'use client'

import axios from 'axios'
import { useSession, signOut } from 'next-auth/react'
import React, { useEffect } from 'react'
const RefreshToken = () => {
    const { data: session } = useSession()
    const refreshAccess = async () => {
        if (!session) return
        console.log('check token...')

        const token = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/token`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                    refreshToken: `${session?.refreshToken}`,
                },
            },
        )
        const result = token.data
        if (result.status === 'error') {
            if (result.result === 'signout') {
                alert('다시 로그인해 주세요.')
                signOut()
            }
            if (result.result === 'No Authorization') {
                alert('접근할 수 없습니다.')
                signOut()
            }
        } else if (result.status === 'ok') {
            if (session) session.accessToken = result.result.token
        }
    }
    useEffect(() => {
        const checking = setInterval(
            () => {
                refreshAccess()
            },
            1000 * 60 * 4,
        )
        return () => {
            clearInterval(checking)
        }
    }, [session])
    return <></>
}

export default RefreshToken
