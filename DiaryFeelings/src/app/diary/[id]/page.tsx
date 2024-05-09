'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import { IDiary } from '@/app/types/type'
import Image from 'next/image'
import moment from 'moment'
import {
  ainmom,
  bareun,
  kyobo,
  omyu,
  ridi,
  shin,
  pretendard,
} from '@/app/components/fonts/fonts'
import { useSession } from 'next-auth/react'
import LottieCat from '@/app/components/LottieCat'
import Sunny from '@/app/components/weathers/Sunny'
import Snowy from '@/app/components/weathers/Snowy'
import Windy from '@/app/components/weathers/Windy'
import Rainy from '@/app/components/weathers/Rainy'
import Cloudy from '@/app/components/weathers/Cloudy'
import { useRouter } from 'next/navigation'
interface Props {
  id: string
}

const DiaryDetail = ({ params }: { params: Props }) => {
  const { data: session } = useSession<any>()
  const userObj = session?.user?.id as string
  const [view, setView] = useState<IDiary>()
  const [img, setImg] = useState<string[]>([])
  const [selImg, setSelImg] = useState('')
  const [font, setFont] = useState(0)
  const num = parseInt(params.id)
  const [loading, setLoading] = useState(true)
  const router = useRouter();
  // const router = useRouter()
  const fontList = [
    ['프리텐다드', pretendard.className],
    ['바른히피', bareun.className],
    ['오뮤 다예쁨', omyu.className],
    ['리디바탕', ridi.className],
    ['아인맘', ainmom.className],
    ['교보 손글씨', kyobo.className],
    ['신동엽 손글씨', shin.className],
  ]

  // 숫자로 변환했는데 NaN이면 없는 페이지.
  if (isNaN(num)) {
    notFound()
  }

  const getDiary = async () => {
    setLoading(true)
    const result = await axios.get(`/api/diary/${num}`,{
      headers: {
        'Authorization': `mlru ${session?.accessToken}`
      }
    })
    const data = result.data
    setView((prev) => data.result)
    setFont(() => data.result.diary_font)
    setImg((prev) => {
      return data.result.image_src.split(',')
    })
    setSelImg((prev) => data.result.image_src.split(',')[0])
    setLoading(false)

  }
  useEffect(() => {
    getDiary()
  }, [num])

  /* delete function */
  const handleDelete = async (e: any) => {
    /* get user id from session */
    if (confirm('정말 삭제하시겠어요?')) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/diary`, {
          data: {
            id: userObj,
            diary_number: view?.diary_number,
          },
        })

        if (response.data.msg === 'success') {
          alert('삭제되었습니다🤗')
          router.push('/diary?page=1')
        }
      } catch (error) {
        alert('삭제에 실패했어요🥲\n 다시 시도해 주세요')
      }
    }
  }

  /* modify function */
  const handleModify = () => {
    router.push(`/diary/modify/${view?.diary_number}`)
  }

  return loading ? (
    <LottieCat text={'읽어오고 있어요'} />
  ) : (
    <div className="w-full flex justify-center items-center p-[7px] mt-[-20px]">
      <div className="relative w-[1280px] flex flex-col items-end p-[30px]  border rounded-md shadow-lg mt-[40px] dark:bg-[#474747]">
        <div className="border shadow-lg absolute p-[10px] rounded-md my-[20px] flex flex-col justify-center items-center top-[-20px] right-[-150px] dark:bg-[#474747]">
          {/* weather */}
          <div className="relative flex flex-col justify-center items-center w-24 h-24 mb-3">
            <span className="mt-2">오늘의 날씨</span>
            {view?.diary_weather === 'sunny' && <Sunny />}
            {view?.diary_weather === 'rainy' && <Rainy />}
            {view?.diary_weather === 'cloudy' && <Cloudy />}
            {view?.diary_weather === 'snowy' && <Snowy />}
            {view?.diary_weather === 'windy' && <Windy />}
          </div>
          <div>{moment(view?.diary_userDate).format('YYYY-MM-DD')}</div>
        </div>
        {/* diary title */}
        <div
          className={`w-full h-[50px] px-[10px] text-[30px] mt-[30px] border-b-[2px] dark:border-[#666] outline-0 bg-[transparent] ${fontList[font][1]}`}
        >
          {view?.diary_title}
        </div>
        {/* emotion */}
        <div className="w-full py-[10px] mt-[20px] flex flex-col items-center justify-center">
          <div className="flex">
            <div className="flex flex-col items-center gap-[15px] w-full ">
              <Image
                src={`/${view?.diary_userEmo}.png`}
                width={110}
                height={110}
                alt={`${view?.diary_userEmo}`}
                className={`w-[110px] h-[110px]`}
              />
              {/* advice */}
              <div
                className=" justify-center content-center items-center
              px-[12px] py-[7px] bg-[#b2a4d4] whitespace-nowrap rounded-md translate-x-[0%] text-white after:absolute after:top-[-10px] after:left-[50%] after:translate-x-[-50%] after:border-t-0 after:border-r-[10px] after:border-b-[15px] after:border-l-[10px] after:border-t-[transparent] after:border-r-[transparent] after:border-b-[#b2a4d4] after:border-l-[transparent]"
              >
                <div className="text-white text-center text-[15px]">
                  {view?.diary_advice}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* user image */}
        <div className="w-full py-[10px] flex flex-col justify-center items-center">
          <div className="mt-[30px] w-full flex">
            <div className="mr-[30px] h-[350px] shadow-lg dark:bg-[#666] border hover:border-1 focus-within:border-1 ">
              <div className="w-[300px] h-[300px] p-3 rounded-md object-contain flex justify-center items-center overflow-hidden">
                {<Image src={selImg} alt="preview" width={300} height={300} />}
              </div>
              <div className="flex justify-center items-center gap-[30px]">
                {img.map(
                  (data, index) =>
                    data && (
                      <span
                        key={index}
                        onClick={() => setSelImg((prev) => img[index])}
                        className="p-1 px-[10px] cursor-pointer hover:text-[#b2a4d4] dark:text-[white] dark:hover:text-[#b2a4d4]"
                      >
                        {index + 1}
                      </span>
                    ),
                )}
              </div>
            </div>
            <div className="w-full flex flex-col">
              {/* diary content */}
              <div
                className={`border max-w-4xl h-[350px] overflow-y-scroll outline-none rounded-md p-[25px] text-lg bg-[transparent] shadow-lg dark:bg-[#666] ${fontList[font][1]} leading-9 whitespace-pre-wrap`}
              >
                {view?.diary_content}
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-5">
          <div className="bg-[#b2a4d4] text-white px-[14px] py-[7px] rounded-md cursor-pointer opacity-[0.8] hover:opacity-[1]">
            <span className="text-lg" onClick={handleModify}>
              수정
            </span>
          </div>
          <div className="bg-[#b2a4d4] text-white px-[14px] py-[7px] rounded-md cursor-pointer opacity-[0.8] hover:opacity-[1] ml-4">
            <span className="text-lg" onClick={handleDelete}>
              삭제
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiaryDetail
