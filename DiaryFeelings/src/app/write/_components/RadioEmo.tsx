"use client";


import Radio from "./Radio";
import Image from 'next/image'
interface Props {
    view: string;
    value: string;
    setView: Function;
    emotion: string;
    emoHover: string;
}

const RadioEmo = ({ view, value, setView, emotion, emoHover }: Props) => {
    return (
        <Radio value={`${emoHover}`} className={`relative flex justify-center items-center w-[100px] h-[100px] rounded-md ${value === emoHover ? 'shadow-xl' : ''}`}>
            <Image src={`/${emoHover}.png`} width={75} height={75} alt={`${emoHover}`} className={`w-[75px] h-[75px]`}
                onMouseOver={() => setView(emoHover)}
                onMouseLeave={() => setView('')}
            />
            {
                view === emoHover && value !== emoHover ? (
                    <div className="absolute px-[12px] py-[5px] bg-[#b2a4d4] whitespace-nowrap bottom-[-20px] rounded-md left-[50%] translate-x-[-50%] shadow-xl text-white
                                    after:content-[' '] after:absolute after:top-[-10px] after:left-[50%] after:translate-x-[-50%] after:w-0 after:h-0 after:border-t-0 after:border-r-[10px] after:border-b-[15px] after:border-l-[10px] after:border-t-[transparent] after:border-r-[transparent] after:border-b-[#b2a4d4] after:border-l-[transparent]
                                ">
                        <span className="text-sm flex justify-center items-center">{emotion}</span>
                    </div>
                ) : (
                    <></>
                )
            }
            {
                value === emoHover && (
                    <div className="absolute px-[12px] py-[5px] bg-[#b2a4d4] whitespace-nowrap bottom-[-20px] rounded-md left-[50%] translate-x-[-50%] shadow-xl text-white
                                    after:content-[' '] after:absolute after:top-[-10px] after:left-[50%] after:translate-x-[-50%] after:w-0 after:h-0 after:border-t-0 after:border-r-[10px] after:border-b-[15px] after:border-l-[10px] after:border-t-[transparent] after:border-r-[transparent] after:border-b-[#b2a4d4] after:border-l-[transparent]
                                ">
                        <span className="text-sm flex justify-center items-center">{emotion}</span>
                    </div>
                )
            }
        </Radio>
    )
};

export default RadioEmo