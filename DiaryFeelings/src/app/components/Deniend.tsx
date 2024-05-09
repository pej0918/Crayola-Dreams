"use client"
import Lottie from "react-lottie-player"
import lottieShiba from './lottieShiba.json'
import { pretendard } from "./fonts/fonts"
const Denined = () => {
    return (
        <div className="w-full h-full flex justify-center items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] mt-[-80px]">
            <div className="flex flex-col justify-center items-center">
                <Lottie
                    loop
                    animationData={lottieShiba}
                    play
                    style={{ width: 500, height: 500 }}
                />
                <span className={`text-[36px] mt-[-55px] font-bold`}>403 FORBIDDEN</span>
                <span className="text-lg">접근할 수 없는 페이지예요</span>
            </div>
        </div>
    )
}

export default Denined