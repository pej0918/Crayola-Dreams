'use client'

import { Image } from "@nextui-org/react";
import { useState } from "react"
import MainWrite from '@/app/components/main/MainWrite'
import MainView from '@/app/components/main/MainView'
import MainCalendar from '@/app/components/main/MainCalendar'
import MainChart from "./main/MainChart";
import MainChartDark from "./main/MainChartDark";
import MainDesc from "./main/MainDesc";
import Link from "next/link";
import { useTheme } from 'next-themes'
import { useRouter } from "next/navigation";

const NotLoginMain = () => {
    
    // 마우스 올리면 값에 따라 보여주는 내용 변경.
    const [hover, setHover] = useState('first');
    const { systemTheme, theme, setTheme } = useTheme() // 다크모드테마 설정
    const currentTheme = theme === 'system' ? systemTheme : theme
    const router = useRouter()

    // 값에 따라 컴포넌트 리턴.
    const showPages = () => {
        if(hover === 'first') {
            return <MainWrite />
        }
        if(hover === 'second') {
            return <MainView />
        }
        if(hover === 'third') {
            return <MainCalendar />
        }
        if(hover === 'fourth') {
            return currentTheme === 'light' ? <MainChart /> : <MainChartDark />
        }
    }
    return (
        <div className="w-full flex flex-col justify-center items-center py-[200px]">
            <div className="flex flex-col justify-center items-center">
                <span className="text-[60px] font-bold">
                    감정을 기록하는 일기
                </span>
                <span className="text-lg">
                    당신의 감정을 기록하고, 되돌아 보세요.
                </span>
                    <span className="shadow-xl mt-[15px] text-[30px] px-[24px] py-[12px] rounded-md text-white bg-[#b2a4d4] cursor-pointer"
                        onClick={() => router.push('/signin')}
                    >
                        내 감정을 기록하기
                    </span>
            </div>
            <div className="relative flex flex-col w-full justify-center items-center mt-[100px]">
                <div className="w-full h-[450px] flex justify-center overflow-hidden main-light">
                    <Image
                        src="/main/diary_modify.png"
                        className="w-full h-full"
                    />
                </div>
                <div className="w-full h-[450px] flex justify-center overflow-hidden main-dark">
                    <Image
                        src="/main/diary_modify_dark.png"
                        className="w-full h-full"
                    />
                </div>
                <div className="flex justify-center items-center w-full mt-[-10px] ">
                    <MainDesc
                        hover={hover}
                        btn='first'
                        setHover={setHover}
                        pic='✏️'
                        title='일기 작성하기'
                        content='오늘 하루 있었던 일을 기록해 보세요.'
                    />
                    <MainDesc
                        hover={hover}
                        btn='second'
                        setHover={setHover}
                        pic='✨'
                        title='나에게 한 마디'
                        content='AI가 해주는 한 마디, 위로가 될지도요.'
                    />
                    <MainDesc
                        hover={hover}
                        btn='third'
                        setHover={setHover}
                        pic='🗓️'
                        title='달력 보기'
                        content='그동안 써왔던 일기를 달력으로 한눈에 볼 수 있어요.'
                    />
                    <MainDesc
                        hover={hover}
                        btn='fourth'
                        setHover={setHover}
                        pic='📊'
                        title='감정 그래프'
                        content='내 감정 변화를 확인해 볼 수도 있죠.'
                    />
                </div>
                <div className="max-w-[1600px] h-[550px] mt-[20px] flex justify-center items-center rounded-md shadow-xl">
                    {
                        showPages()
                    }
                </div>
                <div className="w-full flex justify-center items-center mt-[200px]">
                        <span className="mt-[30px] text-[30px] px-[24px] py-[12px] border rounded-md text-white bg-[#b2a4d4] cursor-pointer"
                            onClick={() => router.push('/signin')}
                        >
                            감정을 기록하러 가볼까요?
                        </span>
                </div>
            </div>
        </div>
    )
}

export default NotLoginMain