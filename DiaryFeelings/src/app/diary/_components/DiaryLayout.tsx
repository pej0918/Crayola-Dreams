'use client'

import { IDiary } from '@/app/types/type'
import moment from 'moment'
import { Image } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
interface Props {
  data: IDiary,
  userImg: any
}
const emotionImg: { [key: string]: string } = {
  normal: '/nothinking.png',
  sad: '/sad.png',
  angry: '/angry.png',
  suprise: '/joy.png',
  happy: '/3_love.png',
  depress: '/depress.png',
}
const Diary = ({ data, userImg }: Props) => {
  const router = useRouter()
  
  const userProfile = userImg ? userImg.user_image : '/joy.png';
  return (
    <div
      className="border border-[#ddd] dark:bg-[#474747] dark:border-[#555] relative w-[350px] h-[500px] rounded-[20px] flex flex-col justify-between overflow-hidden pb-[10px] shadow-lg mx-[35px] mb-[140px] hover:shadow-xl hover:scale-[1.02] ease-in duration-200 cursor-pointer"
      onClick={() => router.push(`/diary/${data.diary_number}`)}
    >
      <div className="relative w-full h-[250px] bg-gray-200 object-cover">
        <div className="w-full h-full object-cover overflow-hidden flex justify-center items-center">
          {data.image_src && (
            <Image
              src={data.image_src.split(',')[0]}
            />
          )}
        </div>
        <div className="absolute p-[7px] w-[60px] h-[60px] rounded-[50%] bg-white shadow-lg bottom-[-30px] right-[30px] object-cover overflow-hidden z-10 dark:bg-[#666]">
          <img
            src={
              data.diary_userEmo
                ? emotionImg[data.diary_userEmo]
                : '/nothinking.png'
            }
            alt=""
            className="w-full h-full"
          />
        </div>
      </div>
      <div className="flex flex-col w-full p-[20px] justify-around">
        <div className="flex flex-col w-full">
          <span className="text-[18px] font-pretendard dark:text-[white]">
            {data.diary_title.length >= 26
              ? `${data.diary_title.replaceAll('\n', ' ').slice(0, 26)}...`
              : data.diary_title.replaceAll('\n', ' ')}
          </span>
          <pre className="text-sm mt-[20px] text-gray-500 whitespace-pre-wrap font-pretendard dark:text-[#bbb]">
            {data.diary_content.length >= 68
              ? `${data.diary_content.replaceAll('\n', ' ').slice(0, 68)}...`
              : data.diary_content.replaceAll('\n', ' ')}
          </pre>
        </div>
      </div>
      <div className="flex items-center mb-[20px] ml-[20px]">
        <div className="w-[45px] h-[45px] rounded-full bg-white shadow-lg overflow-hidden object-cover">
          <Image src={userProfile} alt="" className="w-full h-full rounded-full" />
        </div>
        <div className="flex flex-col ml-[15px] justify-center">
          <span className="text-white-600 text-[14px] dark:text-[white]">{data.user_name}</span>
          <span className="text-white-400 text-[12px] dark:text-[#eee]">
            {moment(data.diary_userDate).format('YYYY-MM-DD-HH:MM')}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Diary
