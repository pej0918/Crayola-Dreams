'use client'

import React, { useState, useRef, useEffect } from 'react'
import BarChart from './_components/BarChart'
import BarChartDark from './_components/BarChartDark'
import LottieCat from '@/app/components/LottieCat'
import {
  Avatar,
  Image,
  Button,
  Textarea,
  Link,
  Tooltip,
  Switch,
} from '@nextui-org/react'
import { useRecoilState } from 'recoil'
import { userInfo } from '@/app/lib/atoms/atom'
import { IDiary } from '@/app/types/type'
import { useMediaQuery } from 'react-responsive'
import axios from 'axios'
import { DoughnuChart } from './_components/DoughnuChart'
import { DoughnuChartDark } from './_components/DoughnuChartDark'
import { useTheme } from 'next-themes'
// img 상태의 타입을 정의하는 인터페이스
import Sunny from '@/app/components/weathers/Sunny'
import Snowy from '@/app/components/weathers/Snowy'
import Windy from '@/app/components/weathers/Windy'
import Rainy from '@/app/components/weathers/Rainy'
import Cloudy from '@/app/components/weathers/Cloudy'
import { useRouter } from 'next/navigation'

interface IImg {
  diary_weather: any
  diary_userEmo: string
  diary_number: string
  image_src: string
  diary_title: string
  updated_at: string
  diary_content: string // 이 부분을 추가
  user_name: string // 이 부분을 추가
  user_id: string // 이 부분을 추가
  src: string
  user_image: string
  user_desc: string
  // 추가적인 필요한 속성들을 여기에 추가
}
type EmotionImg = {
  [key: string]: {
    src?: string | any | undefined | null
    text?: string
    emo?: string
    mean?: string
  }
}

// 사용자 감정 모음
const emotionImg: EmotionImg = {
  happy: { src: '/3_love.png', text: '늘 행복해 :)', emo: '행복', mean: '' },
  suprise: { src: '/normal.png', text: '엄마야!', emo: '놀람', mean: '' },
  angry: { src: '/angry.png', text: '너무 화가 난다아', emo: '분노', mean: '' },
  sad: { src: '/sad.png', text: '너무 슬퍼 :(', emo: '슬픔', mean: '' },
  depress: {
    src: '/depress.png',
    text: '너무 불안불안..',
    emo: '불안',
    mean: '',
  },
  normal: {
    src: '/nothinking.png',
    text: '나는 아무 생각이 없어',
    emo: '중립',
    mean: '',
  },
}

// 사용자 날씨 정보
const weather: EmotionImg = {
  sunny: { src: <Sunny />, emo: '맑음' },
  cloudy: { src: <Cloudy />, emo: '흐림' },
  snowy: { src: <Snowy />, emo: '눈' },
  rainy: { src: <Rainy />, emo: '비' },
  windy: { src: <Windy />, emo: '바람' },
}

function formatDateString(dateString: string): string {
  const formattedDate = dateString.substring(0, 10) // "yyyy-mm-dd" 부분 추출
  return formattedDate
}
const page = () => {
  const [user, setUser] = useRecoilState(userInfo)
  const [view, setView] = useState<IDiary[]>([])
  const [imgView, setImgView] = useState<IImg[]>([]) // 일기 이미지주소
  const [datePart, setDatePart] = useState<string>() //시간
  const { systemTheme, theme, setTheme } = useTheme() // 다크모드테마 설정
  const currentTheme = theme === 'system' ? systemTheme : theme
  const userDesc = useRef<HTMLTextAreaElement | null>(null)
  const [textareaValue, setTextareaValue] = useState<string | undefined>(
    undefined,
  )
  const [loading, setLoading] = useState(true) // 데이터 읽어오는 로딩으로 이용
  const router = useRouter()
  // console.log('123', textareaValue)
  // console.log(currentTheme)
  // console.log(emotionImg.놀람)
  // console.log(user)

  // API 주소를 env 파일에서 가져오기
  // useEffect 훅을 사용하여 컴포넌트가 마운트될 때 fetchData 함수 호출
  useEffect(() => {
    if (user.id) {
      fetchData()
    }
  }, [user.id])

  async function fetchData() {
    if (!user.id) return
    try {
      // API 주소를 절대 경로로 쓰기
      setLoading(true)
      const response = await axios.get<{
        imgrows: IImg[]
        result: IDiary[]
      }>(`/api/emotion?userId=${user.id}`)
      const data = response.data // Axios already parses the JSON

      if (response.status === 200) {
        // Handle successful response

        // console.log('Data:', data.result)
        setDatePart(
          new Date(data.result[0].created_at).toISOString().split('T')[0],
        )
        // view 상태를 업데이트하기
        setView(data.result)
        // const imgViewtest = data.imgrows.slice(0, 6).map((img) => img.image_src)
        setImgView(data.imgrows)
        setTextareaValue(data.result[0].user_desc)
        setLoading(false)
      } else {
        // Handle API error
        console.error('API error:', data)
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Network error:', error)
    }
  }

  // 유저 목표,다짐 텍스트 보내기
  const userDescPost = async (e: any) => {
    e.preventDefault()
    if (!userDesc.current) return
    const result = await axios.post('/api/edit', {
      userDesc: userDesc.current.value,
      userId: user.id
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    setUser(prev => ({
      ...prev,
      desc: userDesc.current?.value
    }))
    alert('다짐을 바꿨어요!💪')
  }

  // 이미지 개수
  const isLargeScreen = useMediaQuery({ minWidth: 2100 })
  // 화면 크기가 1500px 이상이고 1900px 미만인지 확인하는 변수
  const isMediumScreen = useMediaQuery({ minWidth: 1600, maxWidth: 2000 })
  const isSmallScreen = useMediaQuery({ minWidth: 1024, maxWidth: 1599 })
  const SmallScreen = useMediaQuery({ maxWidth: 1023 })
  // 보여줄 이미지 개수를 상태로 관리하는 변수
  const [showCount, setShowCount] = useState(5)
  const maxLength = 40
  // 화면 크기가 변경될 때마다 보여줄 이미지 개수를 업데이트하는 함수
  useEffect(() => {
    if (isLargeScreen) {
      setShowCount(5)
    } else if (isMediumScreen) {
      setShowCount(4)
    } else if (isSmallScreen) {
      setShowCount(3)
    } else if (SmallScreen) {
      setShowCount(2)
    }
  }, [isLargeScreen, isMediumScreen, isSmallScreen, SmallScreen])
  // 그래프 함수

  const [graph, setGraph] = useState<boolean>(true)
  const graphclick = () => {
    setGraph(!graph)
  }

  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNextButtonClick = () => {
    // 현재 인덱스가 이미지 배열 길이보다 작을 때만 다음 일기로 이동
    if (currentIndex < imgView.length - showCount) {
      setCurrentIndex(currentIndex + 1)
    }
  }
  const handlePrevButtonClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <>
      {
        loading ? (<LottieCat text='읽어오고 있어요' />) :
          (
            <div className="">
              {/* 일기목록 */}
              <div className="flex flex-col items-center mt-10">
                <h1 className="w-auto flex items-start justify-start mt-20 mb-9 text-xxxl">
                  ✏️ 최근 일기 목록
                </h1>
                <span className="opacity-70">
                  최근 10일 동안 작성한 일기를 볼 수 있어요✨
                </span>
                {/* 최근 일기목록  */}
                <div className={'h-[23rem] flex flex-row justify-center mt-5 '}>
                  {imgView.length > 3 && (
                    <div className="flex flex-col justify-center mt-5 opacity-60 hover:opacity-100 overflow-hidden">
                      <button
                        className="rounded-full  dark:border-white/80"
                        onClick={handlePrevButtonClick}
                      >
                        {currentTheme === 'dark'
                          ? <Image src="/arrow-left.png" className="w-7 closeWhite" />
                          : <Image src="/arrow-left.png" className="w-7" />
                        }
                      </button>
                    </div>
                  )}

                  {/* =============================
              h-[23rem]
              일기 내용 들어갈 부분
              - 이미지
              - 제목
              - 내용
              - 유저 이미지
              - 유저 네임
              - 날짜 

              =============================
          */}
                  {/* 일기작성된게 없으면  */}
                  {imgView.slice(currentIndex, currentIndex + showCount).length ===
                    0 ? (
                    <div className="flex flex-col justify-center items-center mt-10">
                      <Image src="/cat.png"></Image>
                      <span className="text-base opacity-70">
                        최근 작성한 일기가 없어요... 일기를 작성해 보세요{' '}
                      </span>
                      <Link href="/write">
                        <button className="p-3 pl-10 pr-10 mt-5 mb-5 border rounded-md bg-purple text-white">
                          일기 작성하기
                        </button>
                      </Link>
                    </div>
                  ) : (
                    // 일기 작성된게 하나라도 있다면?
                    imgView
                      .slice(currentIndex, currentIndex + showCount)
                      .map((src, index) => (
                        // Your existing mapping logic here
                        <div
                          key={src.diary_number}
                          className="relative w-[20rem] h-[21rem] bg-white dark:bg-[#474747] mb-10 rounded-2xl ml-4 mr-5 mt-5 shadow-lg border border-neutral-200 dark:border-[#666] hover:scale-105 transition-transform duration-400 cursor-grab dark:text-[#eee]"
                        >
                          <div className="absolute right-3 top-[8.3rem] flex items-center justify-center  w-14 h-14 border border-neutral-100 rounded-full z-20 shadow-lg bg-white dark:border-[#666] dark:bg-[#555] overflow-hidden">
                            <Image
                              // 추가할곳
                              src={
                                src.diary_userEmo
                                  ? emotionImg[src.diary_userEmo]?.src
                                  : '/happy.png'
                                // '/normal.png'
                              }
                              className="w-10 h-10"
                            ></Image>
                          </div>
                          <a href={`/diary/${src.diary_number}`}>
                            <Image
                              isZoomed
                              radius="md"
                              src={src.image_src}
                              className="w-[20rem] h-[10rem] rounded-t-xl"
                            />
                            {/* 사용자 이모지  */}

                            <div className="mt-4 ml-4 mr-4">
                              <h1 className="text-lg mb-5">
                                {src.diary_title.length > 10
                                  ? src.diary_title.slice(0, 11) + ' ...'
                                  : src.diary_title}
                                {/* {src.diary_title} */}
                              </h1>
                              <span className="opacity-70 overflow-x-auto ">
                                {src.diary_content.length > maxLength
                                  ? src.diary_content.slice(0, maxLength) + ' ...'
                                  : src.diary_content}
                              </span>
                              {/* 일기 날씨  추가할곳*/}{' '}
                              <div className="absolute right-3 bottom-2 w-12 h-12 ">
                                {src.diary_weather
                                  ? weather[src.diary_weather]?.src
                                  : ''}
                              </div>
                              <div className="flex flex-row mt-5">
                                <div className="flex flex-row ">
                                  {/* 일기 날짜 */}
                                  <span className="opacity-70 mb-3">
                                    {formatDateString(src.updated_at)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </a>
                          {/* Your existing content here */}
                        </div>
                      ))
                  )}
                  {imgView.length > 3 && (
                    <div className="flex flex-row mt-5 opacity-60 hover:opacity-100 rounded-full">
                      <button
                        className=" rounded-full  dark:border-white/80"
                        onClick={handleNextButtonClick}
                      >
                        {
                          currentTheme === 'dark'
                            ? <Image src="/arrow-right.png" className="w-7 opacity-50 ml closeWhite" />
                            : <Image src="/arrow-right.png" className="w-7 opacity-50 ml" />
                        }
                      </button>
                    </div>
                  )}
                  {/* 일기 내용 끝  */}
                </div>
                {/* 버튼을 눌렀을 때 다음 일기로 넘어가기 */}

                {/* =============================

                사용자 정보 부분 
                
              ===========================*/}
              </div>
              <div className="flex justify-center items-center flex-col mt-16 mb-10">
                <h1 className="text-xxl ">{user.name} 님 감정 기록 </h1>
                <span className="max-w-[30rem] mt-7 opacity-70">
                  아래는 최근 한 달 동안의 감정을 기록하는 내용입니다<br />
                  한 달 동안의 다양한 경험과 감정을 기록해보세요. :)
                </span>
              </div>
              {/* 사용자 컨테이너*/}
              <div className="flex justify-center flex-row ">
                <div className="flex flex-row justify-center w-4/6">
                  {/* 사용자 정보  */}

                  <div className="flex flex-col justify-center ">
                    <div className="w-11/12 min-w-[18rem] mr-10 bg-white dark:bg-[#474747] opacity-90 rounded-xl shadow-xl border border-neutral-200 dark:border-[#555]">
                      <div className="flex items-center flex-col">
                        <Avatar
                          // view[0]?.user_image
                          src={
                            view[0]?.user_image === 'no image' ||
                              view[0]?.user_image === undefined ||
                              view[0]?.user_image === ''
                              ? '/3_love.png' // Fallback image path
                              : view[0]?.user_image
                          }
                          className="w-[10rem] h-[10rem] text-large m-10 bg-white border-1 border-neutral-300"
                        />
                      </div>

                      <h1 className="text-xl ml-5 mb-1 dark:text-[#eee]">
                        {user.name} 님
                      </h1>
                      <span className="ml-5 opacity-70  dark:text-[#eee]">
                        {user.id}
                      </span>
                      <div className="pr-5 pl-5 mt-3 dark:text-[#eee] resize-none opacity-70">
                        <Textarea
                          label="Description"
                          ref={userDesc}
                          placeholder="다짐과 목표를 적어보세요"
                          disableAnimation
                          disableAutosize
                          classNames={{
                            base: 'max-w-xs',
                            input: 'resize-none min-h-[13rem]',
                          }}
                          value={textareaValue}
                          onChange={(e) => setTextareaValue(e.target.value)}
                        />
                      </div>
                      <div className="flex justify-end pr-5 pt-3">
                        <Button
                          variant="flat"
                          radius="sm"
                          onClick={userDescPost}
                          className='dark:bg-[#b2a4d4] text-[16px]'
                        >
                          변경
                        </Button>
                      </div>
                      <div className="flex justify-center mt-10 mb-5">
                        <Button
                          color="default"
                          variant="faded"
                          className="flex justify-end items-center "
                          onClick={()=>router.push('/edit')}
                        >
                            정보 수정하기 <Link showAnchorIcon className='text-black dark:text-[#eee]'></Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                  {/* 막대그래프 차트 */}

                  <div
                    className={`w-8/12 max-w-[65rem] min-w-[60rem] flex items-center justify-center bg-white dark:bg-[#474747] opacity-90 rounded-xl shadow-xl relative  border border-neutral-200 dark:border-[#555] ${graph ? '' : ''
                      }`}
                  >
                    <div className="absolute top-0 left-0 flex flex-row mt-4 ml-4">
                      <Switch
                        defaultSelected
                        onClick={graphclick}
                        color="secondary"
                        className="opacity-70"
                      ></Switch>
                      <h1 className="text-sm mt-1 opacity-80 dark:text-[#eee]">
                        그래프 변경
                      </h1>
                    </div>
                    <div
                      className={`absolute w-full ${graph
                          ? 'top-[5rem]  dark:text-black'
                          : 'top-[5rem] h-[35rem] flex flex-col justify-center items-center mt-10 ml-10 mr-10  dark:text-black'
                        } `}
                    >
                      {graph ? (
                        currentTheme === 'dark' ? <BarChartDark view={view} /> : <BarChart view={view} />
                      ) : (
                        currentTheme === 'dark' ? <DoughnuChartDark view={view} /> : <DoughnuChart view={view} />
                      )}
                      <div
                        className={`flex flex-row ml-10 just justify-around ${graph ? '' : 'mt-5 ml-3 mr-3'
                          }`}
                      >
                        {' '}
                        {Object.entries(emotionImg).map(([key, value]) => (
                          <React.Fragment key={key}>
                            {' '}
                            <Tooltip
                              placement="top"
                              content={
                                typeof value === 'string' ? key : value.text || key
                              }
                              color="default"
                              delay={0}
                              closeDelay={0}
                              motionProps={{
                                variants: {
                                  exit: {
                                    opacity: 0,
                                    transition: {
                                      duration: 0.1,
                                      ease: 'easeIn',
                                    },
                                  },
                                  enter: {
                                    opacity: 1,
                                    transition: {
                                      duration: 0.15,
                                      ease: 'easeOut',
                                    },
                                  },
                                },
                              }}
                            >
                              <div className={graph ? 'mr-[1rem]' : 'mr-1'}>
                                <Image
                                  src={typeof value === 'string' ? value : value.src}
                                  className="w-full mt-4 "
                                  width={70}
                                  height={70}
                                ></Image>
                              </div>
                            </Tooltip>
                            {graph ? (
                              ''
                            ) : (
                              <span className="mt-5 mr-3 opacity-90">
                                {typeof value === 'string' ? (
                                  ''
                                ) : (
                                  <span className='dark:text-[white]'>{value.emo}</span>
                                )}
                              </span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 캐릭터 컬러에 대한 설명  */}
              <div className=" flex justify-center mt-20 h-20"></div>
            </div>
          )
      }
    </>
  )
}

export default page
