import Lottie from "react-lottie-player"
import lottieJson from './lottie-cat.json'

interface Props {
    text: string
}

export default function Animation({text}: Props) {
    return (
        <div className="flex flex-col justify-center items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] mt-[-40px] dark:bg-[transparent] dark:text-[#eee]">
            <Lottie
                loop
                animationData={lottieJson}
                play
                style={{ width: 300, height: 300}}
            />
            <span className='text-lg'>{text}</span>
        </div>
    )
}