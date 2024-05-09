'use client'

import { useRef, useState, forwardRef } from 'react'
import RadioGroup from '@/app/write/_components/RadioGroup'
import Image from 'next/image'
import DatePicker from 'react-datepicker'
import { ko } from 'date-fns/esm/locale'
import 'react-datepicker/dist/react-datepicker.css'
import RadioEmo from '@/app/write/_components/RadioEmo'
import {
  ainmom,
  bareun,
  kyobo,
  omyu,
  ridi,
  shin,
  pretendard,
} from '@/app/components/fonts/fonts'
import Sunny from '@/app/components/weathers/Sunny'
import Snowy from '@/app/components/weathers/Snowy'
import Windy from '@/app/components/weathers/Windy'
import Rainy from '@/app/components/weathers/Rainy'
import Cloudy from '@/app/components/weathers/Cloudy'

const Write = () => {
  const [value, setValue] = useState('happy')
  const [view, setView] = useState('')
  const [date, setDate] = useState<Date>(new Date())
  const [weather, setWeather] = useState('sunny')
  const [selWeather, setSelWeather] = useState(false)
  const [selFont, setSelFont] = useState(false)
  const [curFont, setCurFont] = useState(0)
  const imgRef = useRef<HTMLInputElement>(null)
  const [imgUrl, setImgUrl] = useState('')

  const titleRef = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLTextAreaElement>(null)
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
        className="cursor-pointer text-black hover:text-[#b2a4d4] dark:text-[white]"
      >
        {value}
      </span>
    </div>
  ))

  const handleImgView = (e: React.ChangeEvent<{ files: FileList | null }>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      URL.revokeObjectURL(imgUrl)
      setImgUrl((prev) => URL.createObjectURL(file))
    }
  }
  const imgReset = () => {
    if (imgRef.current) {
      imgRef.current.value = ''
      URL.revokeObjectURL(imgUrl)
      setImgUrl((prev) => '')
    }
  }
  const send = () => {
    alert('로그인 해서 하루를 기록해 보세요!😊')
  }
  return (
    <div className="relative w-[1280px] h-full flex flex-col items-end p-[30px] rounded-md fade-div dark:bg-[#474747] border border-[#eee] dark:border-[#555]">
      <div className="bg-white border shadow-lg absolute p-[10px] shadow-xl rounded-md my-[20px] flex flex-col justify-center items-center top-[-20px] right-[-150px] dark:bg-[#474747] border border-[#eee] dark:border-[#555]">
        <div
          className="relative flex flex-col justify-center items-center"
          onMouseOver={() => setSelWeather(true)}
          onMouseLeave={() => setSelWeather(false)}
        >
          <span className='dark:text-[white]'>날씨</span>
          {weather === 'sunny' && <div className='w-[100px] h-[100px]'><Sunny /></div>}
          {weather === 'rainy' && <div className='w-[100px] h-[100px]'><Rainy /></div>}
          {weather === 'cloudy' && <div className='w-[100px] h-[100px]'><Cloudy /></div>}
          {weather === 'snowy' && <div className='w-[100px] h-[100px]'><Snowy /></div>}
          {weather === 'windy' && <div className='w-[100px] h-[100px]'><Windy /></div>}
          {selWeather ? (
            <div className="absolute left-[50%] translate-x-[-50%] p-[3px] px-[10px] flex justify-center items-center bottom-[0px] bg-white border gap-[10px] whitespace-nowrap rounded-md shadow-lg dark:bg-[#474747] dark:border-[#555]">
              <span
                className="cursor-pointer hover:text-[#b2a4d4] dark:text-[white] dark:hover:text-[#b2a4d4]"
                onClick={() => setWeather('sunny')}
              >
                맑음
              </span>
              <span> | </span>
              <span
                className="cursor-pointer hover:text-[#b2a4d4] dark:text-[white] dark:hover:text-[#b2a4d4]"
                onClick={() => setWeather('cloudy')}
              >
                흐림
              </span>
              <span> | </span>
              <span
                className="cursor-pointer hover:text-[#b2a4d4] dark:text-[white] dark:hover:text-[#b2a4d4]"
                onClick={() => setWeather('rainy')}
              >
                비
              </span>
              <span> | </span>
              <span
                className="cursor-pointer hover:text-[#b2a4d4] dark:text-[white] dark:hover:text-[#b2a4d4]"
                onClick={() => setWeather('windy')}
              >
                바람
              </span>
              <span> | </span>
              <span
                className="cursor-pointer hover:text-[#b2a4d4] dark:text-[white] dark:hover:text-[#b2a4d4]"
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
        ref={titleRef}
        className={`w-full h-[50px] px-[10px] py-[30px] text-[30px] mt-[10px] border-b-[2px] dark:border-[#888] outline-0 bg-[transparent] text-black dark:text-[#eee] ${fontList[curFont][1]}`}
        placeholder="오늘은 무슨 일이 있었나요?"
      />
      <div className="w-full h-full py-[10px] mt-[10px] flex items-center flex flex-col justify-center items-center">
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
        <div className="mt-[30px] w-full flex">
          <div className="mr-[30px]">
            <div className="w-[200px] h-[150px] rounded-md bg-gray-200 object-contain flex justify-center items-center overflow-hidden dark:bg-[#333]">
              {imgUrl && (
                <Image src={imgUrl} alt="preview" width={200} height={150} />
              )}
            </div>
            {!imgUrl ? (
              <div
                className="rounded-md mt-[15px] p-[5px] flex justify-center items-center bg-[#b2a4d4] cursor-pointer opacity-[0.8] hover:opacity-[1]"
                onClick={() => {
                  if (imgRef.current) imgRef.current.click()
                }}
              >
                <span className="text-[20px] text-white">사진 추가하기</span>
              </div>
            ) : (
              <div
                className="rounded-md mt-[15px] p-[5px] flex justify-center items-center bg-[tomato] cursor-pointer opacity-[0.8] hover:opacity-[1]"
                onClick={imgReset}
              >
                <span className="text-[20px] text-white">사진 지우기</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              hidden={true}
              ref={imgRef}
              onChange={(e) => handleImgView(e)}
            />
          </div>
          <div className="w-full flex flex-col">
            <div className="relative mb-[5px] pb-[5px] rounded-md flex items-center">
              <div
                className="cursor-pointer z-10"
                onMouseOver={() => setSelFont(true)}
                onMouseLeave={() => setSelFont(false)}
              >
                <span className={`relatvie ${fontList[curFont][1]} p-2 border border-[#eee] dark:border-[#555] rounded-md w-[50px] text-black dark:text-[#eee] ${selFont ? 'bg-gray-100 dark:bg-[#555]' : 'bg-white dark:bg-[#676767]'}`}
                >
                  폰트 바꾸기
                </span>
                {selFont ? (
                  <div className="absolute top-[30px] w-[105px] p-[2px] flex flex-col justify-center items-center border bg-white rounded-md cursor-pointer dark:bg-[#676767]">
                    {fontList.map((data, index) => (
                      <span
                        key={index}
                        className={`my-[2px] ${data[1]} text-black dark:text-[#eee] hover:text-[#b2a4d4] dark:hover:text-[#b2a4d4]`}
                        onClick={() => setCurFont(index)}
                      >
                        {data[0]}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="relative w-full h-full shadow-lg border border-[#eee] rounded-md dark:border-[#666]">
              <textarea
                ref={contentRef}
                name="content"
                id="content"
                className={`icontext resize-none w-full h-full outline-none rounded-md p-[10px] text-black text-lg bg-[transparent] dark:bg-[#555] dark:text-[white] ${fontList[curFont][1]}`}
                placeholder="당신의 하루를 들려주세요"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#b2a4d4] text-white px-[8px] py-[2px] rounded-md cursor-pointer opacity-[0.8] hover:opacity-[1]">
        <span className="text-lg" onClick={send}>
          작성 완료
        </span>
      </div>
    </div>
  )
}

export default Write
