'use client'

import { useState, forwardRef, useEffect, useLayoutEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ko } from 'date-fns/esm/locale'
import DiaryLayout from './_components/DiaryLayout'
import { useRecoilState } from 'recoil'
import { userInfo } from '@/app/lib/atoms/atom'
import { notFound, useSearchParams } from 'next/navigation'
import Pagination from './_components/Pagination'
import { IDiary } from '@/app/types/type'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import LottieCat from '@/app/components/LottieCat'
import NoResult from './_components/NoResult'

const Diary = () => {
  const params = useSearchParams()
  const curDate = new Date()
  curDate.setFullYear(curDate.getFullYear() - 1)
  const [startDate, setStartDate] = useState<Date>(curDate)
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [user, setUser] = useRecoilState(userInfo)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(6)
  const [userImg, setUserImg] = useState('')
  const [loading, setLoading] = useState(false)
  const [view, setView] = useState<IDiary[]>([])
  const curPage = params.get('page') as string
  const { data: session } = useSession()

  useLayoutEffect(() => {
    if(!curPage || isNaN(parseInt(curPage)) === true) {
      notFound()
    }
  },[curPage])
  useEffect(() => {
    setPage((prev) => Number(curPage))
  }, [curPage])

  const getDiary = async () => {
    if (!user.id) return
    setLoading(true)
    const result = await axios.get(
      `/api/diary?page=${curPage}&userId=${user.id}&s=${startDate}&e=${endDate}`,
    {
      headers: {
        'Authorization': `mlru ${session?.accessToken}`
      }
    }
    )
    const data = result.data
    setTotal((prev) => data.total)
    setView((prev) => data.result)
    setUserImg((prev) => data.userImage)
    setLoading(false)
  }
  useEffect(() => {
    setPage((prev) => Number(curPage))
  }, [curPage])
  useEffect(() => {
    // 로그인
    if (startDate > endDate) {
      alert('잘못된 날짜 선택이에요.')
      setStartDate((prev) => endDate)
    }
  }, [startDate, endDate])

  useEffect(() => {
    getDiary()
  }, [page, startDate, endDate, user])

  const CalendarInput = forwardRef(({ value, onClick }: any, ref: any) => (
    // any 안 쓰고 싶은데 몰루겠다...
    <>
      <div className="flex main-light">
        <span>{value}</span>
        <img
          src="./calendar-regular.svg"
          className="w-[20px] h-[20px] ml-[20px] cursor-pointer"
          onClick={onClick}
          ref={ref}
        />
      </div>
      <div className="flex main-dark">
      <span>{value}</span>
      <img
        src="./calendar-regular-dark.svg"
        className="w-[20px] h-[20px] ml-[20px] cursor-pointer"
        onClick={onClick}
        ref={ref}
      />
    </div>
  </>
  ))
  return (
    <>
      {loading ? (
        <LottieCat text={'읽어오고 있어요'}/>
      ) : (
        total < 1 ? (<NoResult />) : (
          <div className="w-full mt-[100px] flex flex-col justify-center items-center">
            <div className="flex flex-wrap max-w-[1280px] justify-center mt-[30px]">
              {view.map((data: IDiary, index: number) => (
                <DiaryLayout key={data.diary_number} data={data} userImg={userImg}/>
              ))}
            </div>
            <div className="border h-[50px] rounded-md flex justify-around items-center mb-[50px] dark:bg-[#474747] shadow-lg">
              <div className="flex items-center px-[60px] z-[10]">
                <DatePicker
                  selected={startDate}
                  locale={ko}
                  dateFormat="yyyy. MM. dd"
                  closeOnScroll={true}
                  onChange={(date: Date) => setStartDate(date)}
                  customInput={<CalendarInput />}
                />
              </div>
              <div>
                <span> ~ </span>
              </div>
              <div className="flex items-center px-[60px] z-[10]">
                <DatePicker
                  selected={endDate}
                  locale={ko}
                  dateFormat="yyyy. MM. dd"
                  closeOnScroll={true}
                  onChange={(date: Date) => setEndDate(date)}
                  customInput={<CalendarInput />}
                />
              </div>
            </div>
            <Pagination total={total} limit={6} page={page} />
          </div>
        )
      )}
    </>
  )
}

export default Diary
