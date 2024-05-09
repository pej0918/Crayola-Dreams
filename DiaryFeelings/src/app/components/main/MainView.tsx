'use client'

import Image from 'next/image'
import {
  bareun,
} from '@/app/components/fonts/fonts'
import Sunny from '@/app/components/weathers/Sunny'

const DiaryDetail = () => {

  return (
    <div className="w-full h-full flex justify-center items-center p-[7px] fade-div">
      <div className="relative w-[1280px] flex flex-col items-end p-[30px] rounded-md mt-[40px] dark:bg-[#474747]">
        <div className="border shadow-lg absolute p-[10px] rounded-md my-[20px] flex flex-col justify-center items-center top-[-20px] right-[-150px] bg-[#eee] dark:bg-[#474747]">
          {/* weather */}
          <div className="relative flex flex-col justify-center items-center">
            <span className='text-black dark:text-[white]'>오늘의 날씨</span>
            <div className='w-[100px] h-[100px]'>
              <Sunny />
            </div>
          </div>
          <div className='text-black dark:text-[white]'>2023-11-20</div>
        </div>
        {/* diary title */}
        <div
          className={`w-full px-[10px] text-[30px] border-b-[2px] dark:border-[#888] pb-[5px] outline-0 bg-[transparent] text-black dark:text-[white] ${bareun.className}`}
        >
          친구와의 웃음 속에서
        </div>
        {/* emotion */}
        <div className="w-full py-[10px] flex flex-col items-center justify-center">
          <div className="flex">
            <div className="flex flex-col items-center gap-[15px] w-full ">
              <Image
                src={`/happy.png`}
                width={70}
                height={70}
                alt={`love emo`}
                className={`w-[70px] h-[70px]`}
              />
              {/* advice */}
              <div
                className=" justify-center content-center items-center
              px-[12px] py-[4px] bg-[#b2a4d4] whitespace-nowrap rounded-md translate-x-[0%] text-white after:absolute after:top-[-10px] after:left-[50%] after:translate-x-[-50%] after:border-t-0 after:border-r-[10px] after:border-b-[15px] after:border-l-[10px] after:border-t-[transparent] after:border-r-[transparent] after:border-b-[#b2a4d4] after:border-l-[transparent]"
              >
                <div className="text-white text-center text-[15px]">
                  행복한 일이 더 많이 생겼으면 좋겠어요!
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* user image */}
        <div className="w-full py-[10px] flex flex-col justify-center items-center">
          <div className="mt-[5px] w-full flex">
            <div className="mr-[30px] h-[230px] shadow-lg dark:bg-[#555] border dark:border-[#444] hover:border-1 focus-within:border-1 ">
              <div className="w-[200px] h-[200px] p-3 rounded-md object-contain flex justify-center items-center overflow-hidden">
                {
                  <Image
                    src="/main/ai_image.webp"
                    alt="preview"
                    width={200}
                    height={200}
                  />
                }
              </div>
            </div>
            <div className="w-full flex flex-col">
              {/* diary content */}
              <div
                className={`border max-w-4xl h-[230px] overflow-y-hidden outline-none rounded-md p-[25px] text-lg bg-[transparent] ${bareun.className} leading-9 whitespace-pre-wrap dark:bg-[#555] dark:border-[#444] dark:text-[white]`}
              >
                오늘은 오랜만에 친구들과 모였다. 함께 저녁을 먹으며 얘기하고 웃음 속에서 시간을 보낸 것은 정말 환상적이었다.{'\n'}
                서로의 이야기에 귀 기울이고, 웃음소리가 공간을 가득 채우는 그 순간은 내게 큰 행복이었다.{'\n'}
                어쩌면 가장 소중한 순간은 평범한 일상에서 찾을 수 있는 것일지도 모르겠다.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiaryDetail
