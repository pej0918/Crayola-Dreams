'use client'

import { IDiary } from '@/app/types/type'
import { useEffect, useRef, useState, forwardRef } from 'react'
import RadioGroup from '../../_components/RadioGroup'
import Image from 'next/image'
import DatePicker from 'react-datepicker'
import { ko } from 'date-fns/esm/locale'
import 'react-datepicker/dist/react-datepicker.css'
import RadioEmo from '../../_components/RadioEmo'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import {
  ainmom,
  bareun,
  kyobo,
  omyu,
  ridi,
  shin,
  pretendard,
} from '@/app/components/fonts/fonts'
import LottieCat from '@/app/components/LottieCat'
import { useRouter } from 'next/navigation'
import UpLoading from '@/app/write/_components/UpLoading'
import Sunny from '@/app/components/weathers/Sunny'
import Snowy from '@/app/components/weathers/Snowy'
import Windy from '@/app/components/weathers/Windy'
import Rainy from '@/app/components/weathers/Rainy'
import Cloudy from '@/app/components/weathers/Cloudy'
interface Props {
  id: string
  test: string
}

const Modify = ({ params }: { params: Props }) => {
  let data: any = {}
  const { data: session, status } = useSession()
  // if(status === 'loading') {
  //     return <Loading />
  // }
  const [value, setValue] = useState('happy')
  const [view, setView] = useState('')
  const [date, setDate] = useState<Date>(new Date())
  const [weather, setWeather] = useState('sunny')
  const [selWeather, setSelWeather] = useState(false)
  const [selFont, setSelFont] = useState(false)
  const [curFont, setCurFont] = useState(0)
  const [imgUrl, setImgUrl] = useState([])
  const [loading, setLoading] = useState(true)
  const [upLoading, setUpLoading] = useState(false)
  const [selImg, setSelImg] = useState('')

  const titleRef = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLTextAreaElement>(null)

  const [titleValue, setTitleValue] = useState('')
  const [contentValue, setContentValue] = useState('')
  const [icons, setIcons] = useState<any[]>([])
  const router = useRouter()
  const emotionList = [
    ['happy', '오늘은 행복한 날이에요!'],
    ['sad', '오늘은 슬픈 날이에요...'],
    ['angry', '오늘은 뿔나는 날이에요!!'],
    ['depress', '오늘은 풀죽은 날이에요...'],
    ['normal', '오늘은 무난한 날이에요.'],
  ]
  const fontList = [
    ['프리텐다드', pretendard.className],
    ['바른히피', bareun.className],
    ['오뮤 다예쁨', omyu.className],
    ['리디바탕', ridi.className],
    ['아인맘', ainmom.className],
    ['교보 손글씨', kyobo.className],
    ['신동엽 손글씨', shin.className],
  ]
  const CalendarInput = forwardRef(({ value, onClick }: any, ref: any) => (
    // any 안 쓰고 싶은데 몰루겠다...
    <div className="flex">
      <span
        onClick={onClick}
        ref={ref}
        className="cursor-pointer hover:text-[#b2a4d4]"
      >
        {value}
      </span>
    </div>
  ))
  const send = async () => {
    console.log('hi')
    if (!session) return
    setUpLoading((prev) => true)
    if (!titleRef.current) {
      alert('제목을 입력해 주세요.')
      return
    }
    if (!contentRef.current) {
      alert('내용을 입력해 주세요.')
      return
    }
    const fonts = curFont.toString()
    console.log(fonts)
    const formData = new FormData()
    formData.append('title', titleRef.current.value)
    formData.append('content', contentRef.current.value)
    formData.append('id', session?.user?.id as string)
    formData.append('name', session?.user?.name as string)
    formData.append('weather', weather)
    formData.append('emotion', value)
    formData.append('datetime', date.toString())
    formData.append('font', fonts)
    formData.append('diary_num', params.id)
    const result = await axios.patch(`/api/diary/${params.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `mlru ${session?.accessToken}`,
      },
    })
    setUpLoading((prev) => false)
    router.push(`/diary/${params.id}`)
  }
  const getData = async (id: string) => {
    setLoading(true)
    const result = await fetch(`/api/diary/${id}`,{
      headers: {
        'Authorization': `mlru ${session?.accessToken}`,
      }
    })
    const rst = await result.json()
    data = rst
    setTitleValue((prev) => data.result.diary_title)
    setContentValue((prev) => data.result.diary_content)
    setImgUrl((prev) => data.result.image_src.split(','))
    setSelImg(prev => data.result.image_src.split(',')[0])
    setWeather((prev) => data.result.diary_weather)
    setValue((prev) => data.result.diary_userEmo)
    setCurFont((prev) => data.result.diary_font)
    setLoading(false)
  }
  useEffect(() => {
    getData(params.id)
  }, [session])
  return (
    <>
      {loading ? (
        <LottieCat text={'읽어오고 있어요'} />
      ) : (
        <div className="w-[1280px] flex flex-col items-end p-[30px] relative border rounded-md shadow-lg mt-[40px] dark:bg-[#474747]">
          {upLoading && <UpLoading />}
          <div className="border shadow-lg absolute p-[10px] rounded-md my-[20px] flex flex-col justify-center items-center top-[-20px] right-[-150px] dark:bg-[#474747]">
            <div
              className="relative flex flex-col justify-center items-center "
              onMouseOver={() => setSelWeather(true)}
              onMouseLeave={() => setSelWeather(false)}
            >
              <span>오늘의 날씨</span>
              <div className="w-24 h-24">
                {weather === 'sunny' && <Sunny />}
                {weather === 'rainy' && <Rainy />}
                {weather === 'cloudy' && <Cloudy />}
                {weather === 'snowy' && <Snowy />}
                {weather === 'windy' && <Windy />}
              </div>
              {selWeather ? (
                <div className="absolute left-[50%] translate-x-[-50%] p-[3px] px-[10px] flex justify-center items-center bottom-[0px] bg-white border gap-[10px] whitespace-nowrap rounded-md shadow-lg">
                  <span
                    className="cursor-pointer hover:text-[#b2a4d4]"
                    onClick={() => setWeather('sunny')}
                  >
                    맑음
                  </span>
                  <span> | </span>
                  <span
                    className="cursor-pointer hover:text-[#b2a4d4]"
                    onClick={() => setWeather('cloudy')}
                  >
                    흐림
                  </span>
                  <span> | </span>
                  <span
                    className="cursor-pointer hover:text-[#b2a4d4]"
                    onClick={() => setWeather('rainy')}
                  >
                    비
                  </span>
                  <span> | </span>
                  <span
                    className="cursor-pointer hover:text-[#b2a4d4]"
                    onClick={() => setWeather('windy')}
                  >
                    바람
                  </span>
                  <span> | </span>
                  <span
                    className="cursor-pointer hover:text-[#b2a4d4]"
                    onClick={() => setWeather('snowy')}
                  >
                    눈
                  </span>
                </div>
              ) : null}
            </div>
            <DatePicker
              selected={date}
              locale={ko}
              dateFormat="yyyy. MM. dd"
              closeOnScroll={true}
              onChange={(date: Date) => setDate(date)}
              customInput={<CalendarInput />}
            />
          </div>
          <input
            type="text"
            onChange={(e) => setTitleValue(e.target.value)}
            value={titleValue}
            ref={titleRef}
            className={`w-full h-[50px] px-[10px] py-[30px] text-[30px] mt-[30px] border-b-[2px] outline-0 bg-[transparent] ${fontList[curFont][1]}`}
          />
          <div className="w-full py-[10px] mt-[10px] flex items-center flex flex-col justify-center items-center">
            <RadioGroup label="emotion" value={value} onChange={setValue}>
              {emotionList.map((data, index) => (
                <RadioEmo
                  key={index}
                  view={view}
                  value={value}
                  setView={setView}
                  emoHover={data[0]}
                  emotion={data[1]}
                />
              ))}
            </RadioGroup>
            <div className="mt-[60px] w-full flex">
              <div className="mr-[30px]">
                <div className="w-[300px] h-[300px] rounded-md bg-gray-200 object-contain flex justify-center items-center overflow-hidden">
                  {imgUrl && (
                    <Image
                      src={selImg}
                      alt="preview"
                      width={300}
                      height={300}
                    />
                  )}
                </div>
                <div className='flex justify-center items-center gap-[30px]'>
                {
                  imgUrl.map((data, index) => (
                    data && <span key={index}
                      onClick={() => setSelImg(prev => imgUrl[index])}
                      className='p-1 px-[10px] cursor-pointer hover:text-[#b2a4d4] dark:text-[white] dark:hover:text-[#b2a4d4]'
                    >{index+1}</span>
                  ))
                }
              </div>
              </div>
              <div className="w-full flex flex-col">
                <div className="relative mb-[5px] pb-[5px] rounded-md flex items-center">
                  <div
                    className="cursor-pointer z-10"
                    onMouseOver={() => setSelFont(true)}
                    onMouseLeave={() => setSelFont(false)}
                  >
                    <span
                      className={`relatvie ${fontList[curFont][1]} p-2 border rounded-md w-[50px] ${selFont ? 'bg-gray-100 dark:bg-[#555]' : 'bg-white dark:bg-[#666]'}`}
                    >
                      폰트 바꾸기
                    </span>
                    {selFont ? (
                      <div className="absolute top-[30px] w-[105px] p-[2px] flex flex-col justify-center items-center border bg-white rounded-md cursor-pointer dark:bg-[#666]">
                        {fontList.map((data, index) => (
                          <span
                            key={index}
                            className={`my-[2px] ${data[1]} hover:text-[#b2a4d4]`}
                            onClick={() => setCurFont(index)}
                          >
                            {data[0]}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="relative w-full h-full shadow-lg border dark:border-[#444] rounded-md">
                  <textarea
                    ref={contentRef}
                    name="content"
                    id="content"
                    onChange={(e) => setContentValue(e.target.value)}
                    value={contentValue}
                    className={`resize-none w-full h-full outline-none rounded-md p-[10px] text-lg bg-[transparent] dark:bg-[#666] ${fontList[curFont][1]}`}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#b2a4d4] text-white px-[14px] py-[7px] rounded-md cursor-pointer opacity-[0.8] hover:opacity-[1]">
            <span className="text-lg" onClick={send}>
              작성 완료
            </span>
          </div>
        </div>
      )}
    </>
  )
}

export default Modify
