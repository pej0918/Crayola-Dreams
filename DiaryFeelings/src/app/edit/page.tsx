'use client'

import React, {
  useRef,
  useState,
  useLayoutEffect,
} from 'react'
import { Button, Avatar, Input } from '@nextui-org/react'
import { EyeFilledIcon } from './_components/EyeFilledIcon'
import { EyeSlashFilledIcon } from './_components/EyeSlashFilledIcon'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Dropout from './_components/Dropout'
import { useRouter } from 'next/navigation'

const page = () => {
  const { data: session } = useSession()
  const [img, setImg] = useState<string>('')
  const [nick, setNick] = useState('')
  const [pwdata, setpwData] = useState('')
  const [pwdata2, setpwData2] = useState('')
  const [user, setUser] = useState<any>({})
  const [isOpen, setIsopen] = useState<boolean>(false)
  const [isVisible, setIsVisible] = React.useState(false)
  const [isVisible2, setIsVisible2] = React.useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)
  const toggleVisibility2 = () => setIsVisible2(!isVisible2)
  const nickRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const pwRef = useRef<HTMLInputElement>(null)
  const pwRef2 = useRef<HTMLInputElement>(null)
  const imgRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  //비밀번호 확인

  const pwChange = (e: any) => {
    setpwData(e.target.value)
  }
  const pwChange2 = (e: any) => {
    setpwData2(e.target.value)
  }

  //session이 변동 될 때마다 session에 저장 되어 있는 user 정보 가져오기

  useLayoutEffect(() => {
    getData()
  }, [session])

  const getData = async () => {
    if (!session) return
    else {
      const id = session.user?.id as string
      const result = await axios.patch('/api/edit', {
        user_id: id,
      })
      const userImg =
        result.data.result[0].user_image === 'no image'
          ? '/joy.png'
          : result.data.result[0].user_image
      console.log(userImg)
      setUser(result.data.result[0].user_id)
      setImg(userImg)
      setNick(result.data.result[0].user_name)
    }
  }

  // 닉네임 변경

  const nickClick = (e: any) => {
    e.target.value = ''
  }

  const nickChange = (e: any) => {
    setNick(e.target.value)
  }

  // 기본 프로필 이미지 설정 및 사용자 첨부 이미지 저장 세팅

  const handleImg = (e: React.ChangeEvent<{ files: FileList | null }>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      URL.revokeObjectURL(img)

      setImg((prev) => URL.createObjectURL(file))
    }
  }
  const imgReset = () => {
    URL.revokeObjectURL(img)
    setImg((prev) => '')
  }

  const editSubmit = async (e: any) => {
    e.preventDefault()
    if (nick && pwdata) {
      if (pwdata === pwdata2) {
        const formData = new FormData()
        if (
          imgRef.current &&
          imgRef.current.files &&
          imgRef.current.files.length > 0
        ) {
          formData.append('img', imgRef.current.files[0])
        }
        formData.append('user_name', nickRef.current!.value)
        formData.append('user_id', emailRef.current!.value)
        formData.append('password', pwRef.current!.value)

        await axios.put('api/edit', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        window.location.href = '/emotion'
      } else {
        alert('비밀번호가 일치하지 않습니다🥹')
      }
    } else {
      alert('정보를 올바르게 입력해 주세요🥹')
    }
  }

  //회원탈퇴 클릭 시 모달창 여닫기

  const dropoutBtn = () => {
    setIsopen(true)
  }
  const closeModal = () => {
    setIsopen(false)
  }

  return (
    <div className="flex h-full w-screen flex-col items-center justify-center mt-[-10px]">
      <div className="w-[500px] rounded-md bg-neutral-50 dark:bg-[#474747] p-[15px] shadow-xl border border-[#eee] dark:border-[#555] dark:text-[#eee]">
        <form>
          <p className="text-xl font-bold text-center mb-4 ">프로필 변경하기</p>
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center">
              <div className="flex gap-4 items-center ">
                <Avatar
                  isBordered
                  radius="md"
                  size="lg"
                  src={img}
                  name="프로필"
                  className="w-[250px] h-[250px] mb-[20px]"
                />
              </div>

              {img ? (
                <div
                  className="text-lg flex justify-center items-center w-[250px] cursor-pointer mt-3 mb-3 p-2 pr-4 pl-4 shadow-md rounded-lg bg-[tomato] text-white dark:border-[#d3d1d1] dark:bg-[#353434] dark:text-[#fff]"
                  onClick={imgReset}
                >
                  프로필 사진 수정하기
                </div>
              ) : (
                <div
                  className="text-lg flex justify-center items-center w-[250px] cursor-pointer mt-3 mb-3 p-2 pr-4 pl-4 bg-slate-200 shadow-md rounded-lg dark:border-[#d3d1d1] dark:bg-[#353434] dark:text-[#fff]"
                  onClick={() => {
                    if (imgRef.current) imgRef.current.click()
                  }}
                >
                  프로필 사진 등록하기
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                ref={imgRef}
                onChange={handleImg}
                id="file"
                className="hidden"
              />
            </div>

            <div className="flex w-[20rem] flex-col  p-2   pt-0">
              <Input
                isRequired
                size="md"
                variant="underlined"
                onClick={nickClick}
                onChange={nickChange}
                type="text"
                ref={nickRef}
                value={nick}
                label="닉네임"
                className=" dark:text-black"
              />
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex  flex-col  p-2 pt-0 w-[20rem]">
              <Input
                isDisabled
                isRequired
                variant="underlined"
                type="text"
                label="아이디"
                ref={emailRef}
                value={user}
                className="max-w-xs"
              />
            </div>

            <div className="flex flex-col  p-2 pt-0 w-[20rem]">
              <Input
                isRequired
                variant="underlined"
                name="pw"
                label="비밀번호"
                onChange={pwChange}
                ref={pwRef}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? 'text' : 'password'}
                className="max-w-xs"
              />
            </div>

            <div className="flex flex-col  p-2 pt-0 w-[20rem]">
              <Input
                isRequired
                variant="underlined"
                name="pwconfirm"
                label="비밀번호 확인"
                onChange={pwChange2}
                ref={pwRef2}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility2}
                  >
                    {isVisible2 ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible2 ? 'text' : 'password'}
                className="max-w-xs"
              />

              {pwdata && pwdata2 !== pwdata && (
                <span className="flex justify-center items-center border border-gray px-[18px] py-[7px] rounded-md mt-[10px] bg-[#ef5350] bg-opacity-50 text-white">
                  비밀번호를 확인해 주세요
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center p-2 pt-0 w-[20rem] mt-5 mb-2">
              <Button
                size="md"
                radius="md"
                className={`w-full ${
                  pwRef.current?.value &&
                  pwRef2.current?.value &&
                  pwRef.current?.value === pwRef2.current?.value
                    ? 'bg-black text-white dark:text-[#eee]'
                    : 'bg-neutral-200 hover:shadow-lg text-[black]'
                } shadow-md`}
                onClick={editSubmit}
              >
                {' '}
                정보 변경하기
              </Button>
            </div>

            <div className="flex flex-col items-center p-2 pt-0 w-[20rem]">
              <Button
                size="md"
                radius="md"
                className="w-full mt-q bg-[#d20000] text-white  hover:shadow-lg shadow-md dark:text-[#e7e1e1]"
                onClick={dropoutBtn}
              >
                {' '}
                탈퇴하기
              </Button>
              <Dropout isOpen={isOpen} closeModal={closeModal} user={user} />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default page
