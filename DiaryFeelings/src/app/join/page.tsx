'use client'
import React, { useRef, useState } from 'react'
import { Button, Avatar, Input } from '@nextui-org/react'
import { EyeFilledIcon } from './_components/EyeFilledIcon'
import { EyeSlashFilledIcon } from './_components/EyeSlashFilledIcon'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const page = () => {
    //비밀번호 보일지 말지
    const [isVisible, setIsVisible] = React.useState(false)
    const [isVisible2, setIsVisible2] = React.useState(false)
    const toggleVisibility = () => setIsVisible(!isVisible)
    const toggleVisibility2 = () => setIsVisible2(!isVisible2)
    //로그인 시 입력할 부분
    const [username, setUsername] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    //라우터
    const router = useRouter()

    //username, password 입력 시 change
    const usernameChange = (e: any) => {
        setUsername(e.target.value)
    }
    const pwChange1 = (e: any) => {
        setPassword1(e.target.value)
    }
    const pwChange2 = (e: any) => {
        setPassword2(e.target.value)
    }

    // 서버로 정보 보내서 회원가입하기
    const joinsubmit = async (e: any) => {
        e.preventDefault()

        const res = await fetch(
            `http://43.202.125.125:8000/dj-rest-auth/registration/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password1: password1,
                    password2: password2,
                }),
            },
        )
        const result = await res.json()
        if (res.status === 400) {
            if (
                result.username &&
                result.username[0] === '해당 사용자 이름은 이미 존재합니다.'
            ) {
                alert('해당 사용자 이름은 이미 존재합니다.')
                return
            }
            if (
                result.password1 &&
                result.password1[0] ===
                    '비밀번호가 너무 짧습니다. 최소 8 문자를 포함해야 합니다.'
            ) {
                alert(
                    '비밀번호가 너무 짧습니다. 최소 8 문자를 포함해야 합니다.',
                )
                return
            }
            if (
                result.password1 &&
                result.password1[0] === '비밀번호가 너무 일상적인 단어입니다.'
            ) {
                alert('비밀번호가 너무 일상적인 단어입니다.')
                return
            }
            if (result.non_field_errors) {
                alert('두 개의 패스워드 필드가 서로 맞지 않습니다.')
                return
            } else {
                alert('회원가입 에러')
                return
            }
        }
        if (res.status === 201) {
            alert('회원가입 성공🥳')
            router.push('/signin')
        }
    }

    return (
        <div className="flex w-screen mt-[25px] flex-col justify-center items-center overflow-visible">
            <div className="p-[20px] px-[100px] border border-purple/40 rounded-2xl shadow-xl dark:border-[#777] dark:bg-[#474747]">
                <div>
                    <form>
                        <p className="text-xl font-bold text-center mb-4 ">
                            회원가입
                        </p>
                        <div className="flex flex-col items-center">
                            <div className="flex w-[20rem] flex-col p-2 pt-0">
                                <Input
                                    isRequired
                                    size="md"
                                    variant="underlined"
                                    type="text"
                                    label="Username"
                                    onChange={usernameChange}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-col  p-2 pt-0 w-[20rem]">
                                <Input
                                    isRequired
                                    variant="underlined"
                                    name="pw"
                                    label="Password"
                                    onChange={pwChange1}
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
                                    label="Password"
                                    onChange={pwChange2}
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
                                {password2 !== '' &&
                                    password1 !== password2 && (
                                        <span className="flex justify-center items-center border-gray px-[18px] py-[7px] rounded-md mt-[10px] bg-[#ef5350] bg-opacity-50 text-white">
                                            비밀번호를 정확히 입력해 주세요
                                        </span>
                                    )}
                            </div>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="flex flex-col items-center p-1 pt-5 w-[20rem]">
                                <Button
                                    size="md"
                                    radius="md"
                                    className={`h-10 w-[19rem] rounded-md bg-[#b2a4d4] bg-opacity-[.8] text-lg font-medium text-white transition-colors duration-300 ease-in-out hover:bg-opacity-[1]`}
                                    onClick={joinsubmit}
                                >
                                    {' '}
                                    가입하기{' '}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="w-20 h-20"></div>
        </div>
    )
}

export default page
