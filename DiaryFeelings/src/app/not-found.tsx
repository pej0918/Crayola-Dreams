'use client'

import Lottie from "react-lottie-player"
import lottieJson from '@/app/components/notfound.json'
import { useSession } from "next-auth/react"
export default function NotFound() {
    const { status } = useSession();
    if(status === 'loading') {
        return <></>
    }
    return (
        <div className="flex flex-col justify-center items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] mt-[-100px]">
            <Lottie
                loop
                animationData={lottieJson}
                play
                style={{ width: 500, height: 500}}
            />
            <span className="text-[40px] text-[tomato] font-bold mt-[-130px]">404 NOT FOUND</span>
            <span className="text-[tomato] text-lg">존재하지 않는 페이지예요</span>
        </div>
    )
}