'use client'

import { useTheme } from 'next-themes'
import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import MypageModal from './MypageModal'
import ModalCalendar from './Calendar'
import { useRouter, usePathname } from 'next/navigation'
import { useRecoilState } from 'recoil'
import { userInfo, calState } from '../lib/atoms/atom'
import axios from 'axios'
import Snow from '../emotion/_components/Snow'
import NotLoginNav from './nav/NotLoginNav'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react'
interface SearchComponentProps {
  className?: string
  src?: string
}
type KeyType = '기록선택' | '달력' | '일기기록' | '일기작성'
const Nav: React.FC<SearchComponentProps> = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const [isLogin, SetIsLogin] = useState<boolean>(false) // 로그인시 네비 상단바 변경
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false) // 마이페이지 모달창
  const { systemTheme, theme, setTheme } = useTheme() // 다크모드테마 설정
  const currentTheme = theme === 'system' ? systemTheme : theme
  const [inputValue, setInputValue] = useState<string>('') // 일기검색
  const [user, setUser] = useRecoilState(userInfo)
  const [isCalendarOpen, setIsCalendarOpen] = useRecoilState(calState) //달력모달
  const [userImg, setUserImg] = useState<any>('') // 유저 이미지
  const [snowTheme, setSnowTheme] = useState<boolean>(false)
  const [selectedKeys, setSelectedKeys] = React.useState<
    void | any | undefined
  >(new Set<KeyType>(['기록선택']))

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(', ').replaceAll('_', ' '),
    [selectedKeys],
  )

  const themeOnClick = () => {
    setSnowTheme(!snowTheme)
  }

  // 로그인후 사용자 아이콘 클릭시 모달생성
  const handleButtonClick = () => {
    setIsModalOpen(!isModalOpen)
    setIsCalendarOpen((prev) => false)
    // console.log('isModalOpen', isModalOpen)
  }
  // console.log(userImg)

  /* Get Search Data from input tag */
  const getSearchData = (e: any) => {
    setInputValue(e.target.value.toLowerCase())
  }

  /* Search Function */
  const onClickSearch = async() => {
    router.push(`/search?keyword=${inputValue}&page=1`)
    setInputValue('')
  }

  /* Search Function */
  const onEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClickSearch()
    }
  }

  // 현진 : 사용자 이미지 150번줄
  // image 로직있고 userImg = useState 쓰는중
  useEffect(() => {
    fetchData()
  }, [user.id])
  async function fetchData() {
    if (!user.id) return
    const response = await axios.get(`/api/emotion?userId=${user.id}`)
    const userResult = await axios.patch(`/api/user`, {
      id: user.id
    })
    const data = response.data
    const userData = userResult.data.result[0]

    if (response.status === 200) {
      // console.log(data.userImg)
      const img = data.userimg[0]?.user_image
        ? data.userimg[0].user_image
        : undefined
      setUserImg(img)
      setUser(prev => {
        const user = {
          id: userData.user_id,
          name: userData.user_name,
          provider: userData.user_provier,
          desc: userData.user_desc
        }
        return user;
      })
    }
  }

  //Calendar 모달
  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen)
  }

  useEffect(() => {
    // 초기 렌더링 시 테마를 라이트 모드로 설정
    if (currentTheme !== 'light') {
      setTheme('light')
    }
  }, []) // 빈 배열을 사용하여 초기 렌더링 시 한 번만 실행

  useEffect(() => {
    if (session?.accessToken) {
      SetIsLogin(true)
      setUser({
        id: session.user?.id as string,
        name: session.user?.name as string,
        provider: session.user?.provider as string,
      })
    } else {
      SetIsLogin(false)
    }
  }, [session])
  if (status === 'unauthenticated') {
    // 인증 안 됨(로그인 안 돼있을 때 보여줄 Nav)
    return <NotLoginNav isLogin={isLogin} />
  }

  return (
    <>
      {snowTheme ? <Snow className="-z-50"></Snow> : ''}

      <div className="w-full h-[67px]">
        <div className="fixed w-full z-50">
          <nav
            className={` relative h-[65px]
        `}
          >
            <div className="w-[100%] h-[70px] left-0 top-0 absolute bg-[#ffffff] dark:bg-[#474747] dark:bg-opacity-80 border-b border-slate-200 dark:border-b-0" />
            {/* =====================
            로그인 회원가입 버튼
            =====================
        */}
            {!isLogin ? (
              <>
                {' '}
                <Link href="/join">
                  <button>
                    <div className="w-[110px] h-[25px] right-[1rem] top-[23px] absolute text-center text-black dark:text-[#F6F7F9] text-base font-normal font-['Pretendard']">
                      <span className="text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100">
                        회원가입
                      </span>
                    </div>
                  </button>
                </Link>
                <Link href="/api/auth/signin">
                  <button>
                    <div className="right-[7.5rem] top-[23px] absolute text-center text-black dark:text-white text-base font-normal ">
                      <span className="text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100">
                        로그인
                      </span>
                    </div>
                  </button>
                </Link>
              </>
            ) : (
              // 로그인 성공시 마이페이지 아이콘 생성
              <>
                <button
                  className="w-14 h-14 flex justify-center items-center absolute right-[3.7rem] top-2.5  border-purple/80 rounded-full hover:bg-purple/20 dark:border-slate-400 dark:hover:bg-slate-600"
                  onClick={handleButtonClick}
                >
                  <Image
                    src={
                      userImg === 'no image' ||
                      userImg === undefined ||
                      userImg === ''
                        ? '/3_love.png' // Fallback image path
                        : userImg
                    }
                    alt="Mypage Logo"
                    className=" opacity-90 hover:opacity-90 transition duration-300 rounded-full border"
                    width={48}
                    height={48}
                    quality={75}
                    priority
                  />
                </button>
                {isModalOpen && (
                  // 모달 컴포넌트 렌더링 컴포넌트로 뺼껀지??
                  <>
                    {/* Overlay */}
                    <div
                      className="fixed inset-0 bg-black opacity-50 z-40"
                      onClick={handleButtonClick} // Close the modal on overlay click
                    ></div>
                    {/* Modal */}
                    <div
                      className={`fixed w-[20rem] h-auto top-0 right-0 p-5 mt-2 bg-white border shadow-md z-50 rounded-l-xl animate-slidein 
                      dark:bg-[#474747] `}
                    >
                      {/* Modal content */}
                      <div>
                        <MypageModal
                          closeModal={handleButtonClick}
                          user={user}
                          userImg={userImg}
                          themeOnClick={themeOnClick}
                          snowTheme={snowTheme}
                        ></MypageModal>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
            {/* 로그인시 일기쓰기 버튼생성  */}

            {isLogin ? (
              <>
                {/* 일기쓰기 링크 */}
                <div className="lg:hidden absolute right-[15rem] top-[25px] ">
                  <Link href="/write">
                    <div
                      className={`active:border-b hover:border-b dark:border-[#666] hover:text-purple active:text-purple ${
                        pathname === '/write' ? 'text-purple ' : ''
                      }`}
                    >
                      <span
                        className=" text-base"
                        onClick={() => setIsCalendarOpen((prev) => false)}
                      >
                        일기 작성
                      </span>
                    </div>
                  </Link>
                </div>

                {/* 달력 버튼 */}

                <div className="absolute right-[29.2rem] top-[25px]">
                  <button
                    onClick={toggleCalendar}
                    className={`active:border-b hover:border-b dark:border-[#666] hover:text-purple active:text-purple ${
                      isCalendarOpen ? ' text-purple' : ''
                    }`}
                  >
                    <span
                      className="lg:hidden text-base "
                      onClick={toggleCalendar}
                    >
                      달력
                    </span>
                  </button>
                </div>

                {/* 모달 렌더링 */}
                {isCalendarOpen && (
                  <ModalCalendar
                    isOpen={isCalendarOpen}
                    closeModal={toggleCalendar}
                    setIsCalendarOpen={setIsCalendarOpen}
                  />
                )}
                <Link
                  href="/diary?page=1"
                  className="absolute right-[22rem] top-[25px] lg:hidden"
                >
                  <div
                    className={` active:border-b hover:border-b dark:border-[#666] mb-4 hover:text-purple active:text-purple ${
                      pathname === '/diary' ? 'text-purple ' : ''
                    }`}
                  >
                    <span
                      className="text-base"
                      onClick={() => setIsCalendarOpen((prev) => false)}
                    >
                      일기 기록
                    </span>
                  </div>
                </Link>

                <div
                  className={`lg:hidden absolute right-[12.5rem] top-6 h-7 border-black border-r dark:border-slate-300`}
                ></div>
                <Dropdown className="">
                  <DropdownTrigger>
                    <Button
                      variant="bordered"
                      className="capitalize hidden lg:block absolute right-[12rem] top-[1.1rem]"
                    >
                      {selectedValue}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Single selection example"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedKeys}
                    // Update the onSelectionChange handler to use Set<KeyType>
                    onSelectionChange={(keys) => setSelectedKeys(keys)}
                    // void={undefined}
                  >
                    <DropdownItem key="기록선택">기록 선택</DropdownItem>
                    <DropdownItem key="달력">
                      {' '}
                      <div className="">
                        <button
                          onClick={toggleCalendar}
                          className={`active:border-b hover:border-b  hover:text-purple active:text-purple ${
                            isCalendarOpen ? ' text-purple' : ''
                          }`}
                        >
                          <span className="text-sm" onClick={toggleCalendar}>
                            달력
                          </span>
                        </button>
                      </div>
                    </DropdownItem>
                    <DropdownItem key="일기기록">
                      <Link href="/diary?page=1" className="">
                        <div
                          className={` active:border-b hover:text-purple active:text-purple ${
                            pathname === '/diary' ? 'text-purple ' : ''
                          }`}
                        >
                          <span
                            className="text-sm"
                            onClick={() => setIsCalendarOpen((prev) => false)}
                          >
                            일기 기록
                          </span>
                        </div>
                      </Link>
                    </DropdownItem>
                    <DropdownItem key="일기작성">
                      <Link href="/write">
                        <div
                          className={`active:border-b hover:text-purple active:text-purple ${
                            pathname === '/write' ? 'text-purple ' : ''
                          }`}
                        >
                          <span
                            className=" text-sm"
                            onClick={() => setIsCalendarOpen((prev) => false)}
                          >
                            일기 작성
                          </span>
                        </div>
                      </Link>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </>
            ) : (
              ''
            )}

            {/* 다크모드 변경모드  */}
            <button
              type="button"
              className={`${!isLogin
                ? 'w-10 h-10 right-[11.5rem] top-[15px] absolute'
                : 'w-10 h-10 right-[8.3rem] top-[18px] absolute'}
                p-[5px] flex justify-center items-center rounded-md bg-[#eee] hover:bg-[#ddd] dark:bg-[#555] dark:hover:bg-[#666]`}
              onClick={() => {
                setTheme(currentTheme === 'dark' ? 'light' : 'dark')
              }}
            >
              {currentTheme === 'dark' ? (
                <>
                  <Image
                    src="/sun.svg"
                    alt="Sun Logo"
                    className="w-[35px]"
                    width={40}
                    height={40}
                    priority
                  />
                </>
              ) : (
                <Image
                  src="/dark.svg"
                  alt="Dark Logo"
                  className="w-[35px] p-1"
                  width={50}
                  height={50}
                  priority
                />
              )}
            </button>

            {/* 검색창 */}
            <div className="flex justify-center items-center self-center w-[20%] max-w-2xl h-[37px] left-[11rem] bottom-[0.7rem] absolute focus-within:shadow-md rounded-md shadow-md dark:shadow-none dark:bg-[#666] border border-[#eee] dark:border-[#666] hover:border-1 focus-within:border-1">
              <Image
                src="/search.svg"
                alt="Search Logo"
                className="left-[0.5rem] absolute stroke-slate-600 cursor-pointer"
                width={23}
                height={23}
                priority
                onClick={onClickSearch}
              />
              <input
                type="text"
                placeholder="일기 검색 . . ."
                value={inputValue}
                onChange={getSearchData}
                onKeyDown={onEnterPress}
                className="absolute w-[90%] max-w-[60%] h-full left-[3rem] outline-none border-none outline-none dark:bg-[#666]"
              ></input>
            </div>
            <div className="left-[4rem] top-[19px] absolute text-black dark:text-white">
              <Link href="/diary?page=1">
                {currentTheme === 'dark' ? (
                  <Image
                    src="/GamgiDark.svg"
                    alt="nav-logo"
                    width={90}
                    height={90}
                  ></Image>
                ) : (
                  <Image
                    src="/Gamgi.svg"
                    alt="nav-logo"
                    width={90}
                    height={90}
                  ></Image>
                )}
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}

export default Nav
