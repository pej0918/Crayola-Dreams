'use client'

import { useRef, useState } from 'react'
import { signIn } from 'next-auth/react'
import React from 'react'

import { Input } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import styles from './styles.module.css'
import LottieCat from '@/app/components/LottieCat'

const Login = () => {
    const [error, setError] = useState('')
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const [login, setLogin] = useState(false)
    const router = useRouter()

    const handleLogin = async () => {
        if (!id) {
            alert('아이디를 입력해주세요.')
            return
        }
        if (!password) {
            alert('패스워드를 입력해주세요.')
            return
        }
        setLogin(true)
        const result = await signIn('credentials', {
            username: id,
            password: password,
            redirect: false,
        })

        if (result?.error) {
            setError('login error')
        } else {
            router.push('/diary?page=1')
            setLogin(false)
        }
    }
    const handleJoin = () => {
        router.push('/join')
    }

    // 엔터 누르면 로그인 실행.
    const sumChk = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            await handleLogin()
        }
    }
    return login ? (
        <LottieCat text="로그인 중이에요" />
    ) : (
        <div className="flex flex-col">
            <div className="flex justify-center items-center h-full mt-[15px]">
                <div className="relative h-full flex justify-center items-center p-[60px] px-[130px] border border-purple/40 rounded-2xl shadow-lg dark:bg-[#474747] dark:border-[#666]">
                    <div className=" mx-auto flex flex-col items-center justify-center ">
                        <div className="mb-2 text-[3.2rem] dark:text-[white] main-light">
                            <img src="/Gamgi.svg" alt="logo" />
                        </div>
                        <div className="mb-2 text-[3.2rem] dark:text-[white] main-dark">
                            <img src="/GamgiDark.svg" alt="logo" />
                        </div>
                        <span className="opacity-70 mb-10 dark:text-[#eee]">
                            로그인해서 감정을 기록해 봐요✏️
                        </span>
                        <div className="relative flex w-[270px] py-[7px] flex-col items-center p-2 pt-0">
                            <Input
                                type="text"
                                label="아이디"
                                className={`w-full rounded-md my-[20px]`}
                                value={id}
                                onChange={(e: {
                                    target: {
                                        value: React.SetStateAction<string>
                                    }
                                }) => {
                                    setId(e.target.value)
                                }}
                                onKeyDown={(
                                    e: React.KeyboardEvent<HTMLInputElement>,
                                ) => sumChk(e)}
                            />
                            <div
                                className={`${
                                    error ? 'block' : 'hidden'
                                } absolute top-[-30px] border border-[#ff7961] px-[30px] py-[7px] rounded-md z-[11] bg-[#ff7961] bg-opacity-[0.6] text-[16px] text-[#b21807] dark:text-[white]`}
                            >
                                {error ? '로그인 정보를 확인해주세요😣' : ''}
                            </div>
                        </div>
                        <div className="flex w-[270px] py-[7px] flex-col  p-2 pt-0">
                            <Input
                                type="password"
                                label="패스워드"
                                className={`w-full rounded-md mb-[20px]`}
                                value={password}
                                onChange={(e: {
                                    target: {
                                        value: React.SetStateAction<string>
                                    }
                                }) => {
                                    setPassword(e.target.value)
                                }}
                                onKeyDown={(
                                    e: React.KeyboardEvent<HTMLInputElement>,
                                ) => sumChk(e)}
                            />
                        </div>
                        <div className=" mt-3 mb-3  flex items-center   justify-center ">
                            <button
                                onClick={handleLogin}
                                className="h-10 w-64 rounded-md bg-black bg-opacity-[.8] text-lg font-medium text-white transition-colors duration-300 ease-in-out hover:bg-opacity-[1]"
                            >
                                로그인
                            </button>
                        </div>
                        <div className="flex justify-center">
                            <hr className="w-[7rem] text-[#888] mt-3 mr-2" />
                            <span className="text-[#888]">or</span>
                            <hr className="w-[7rem] text-[#888] mt-3 ml-2" />
                        </div>
                        <div className="mt-3">
                            <button
                                onClick={handleJoin}
                                className="h-10 w-64 rounded-md bg-[#b2a4d4] bg-opacity-[.8] text-lg font-medium text-white transition-colors duration-300 ease-in-out hover:bg-opacity-[1]"
                            >
                                회원가입
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-20 w-20"></div>
        </div>
    )
}

export default Login
