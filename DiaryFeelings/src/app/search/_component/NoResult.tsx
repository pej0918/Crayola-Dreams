'use client'

import Lottie from "react-lottie-player"
import lottieShiba2 from './ddCat.json'

const NoResult = () => {
    return (
        <div className="w-full h-full flex justify-center items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] mt-[-80px]">
            <div className="flex flex-col justify-center items-center">
                <Lottie
                    loop
                    animationData={lottieShiba2}
                    play
                    style={{ width: 700, height: 500 }}
                />
                <div className="mt-[-150px] flex flex-col justify-center items-center">
                    <span className={`text-[22px] font-bold`}>검색 결과가 없어요😥</span>
                    <span className={`text-[22px] font-bold`}>검색어를 다시 한 번 확인해 주세요</span>
                </div>
            </div>
        </div>
    )
}

export default NoResult;