'use client'

import React, { FormEvent, useEffect, useRef, useState } from 'react'
import '../../write/write.css'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker, { registerLocale } from 'react-datepicker'
import { ko } from 'date-fns/esm/locale'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { DELETE } from '@/app/api/diary/route'

const DiaryWrite = () => {
  const titleRef = useRef<any>()
  const dateRef = useRef<any>()
  const emotionRef = useRef<any>()
  const contentRef = useRef<any>()

  // select date from calendar
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [diaryData, setDiaryData] = useState<any>({})
  const { data: session } = useSession<any>()
  const userObj = session?.user?.id as string
  /* delete button handler */
  const handleDelete = async (e: any) => {
    e.preventDefault()
    /* get user id from session */

    console.log(userObj)
    try {
      const diaryIdToDelete = 3

      const response = await axios.delete(`http://localhost:3000/api/diary`, {
        data: {
          id: userObj,
          diary_number: diaryIdToDelete,
        },
      })

      if (response.data.msg === 'success') {
        alert('삭제 완료~')
        window.location.href = '/diary'
      } else {
        alert('삭제 실패~')
      }
    } catch (error) {
      console.error(error)
      alert('삭제 실패~')
    }
  }

  registerLocale('ko', ko)

  /* load diary from database */
  const [dairyContent, setDiaryContent] = useState([])
  // useEffect(() => {
  //   axios.post(`/api/diary?userId=${userObj}`).then((res) => {
  //     console.log(res.data.rows)
  //   })
  // }, [])

  return (
    <form action="/api/diary">
      <button type="submit" onClick={handleDelete}>
        delet
      </button>
      <div className="write-header">
        {/* select emotion */}
        <div className="img-box">
          <img
            className="write-select-img"
            src="./3_love.png"
            alt="emotion"
            ref={emotionRef}
          />
        </div>
        {/* write diary */}
        <div className="write-tit">
          {/* select date */}
          <DatePicker
            className="write-date"
            dateFormat="yyyy.MM.dd eee요일" // format of edate
            shouldCloseOnSelect // select date close calendar
            minDate={new Date('2000-01-01')} // can't select before minDate
            maxDate={new Date()} // can't select after maxDate
            selected={selectedDate}
            onChange={(date: Date) => setSelectedDate(date)}
            showPopperArrow={false}
            name="writedate"
            locale="ko"
          />
          <textarea
            placeholder="title"
            name="write-title"
            ref={titleRef}
          ></textarea>
        </div>
      </div>
      <div className="write-cont">
        <textarea
          name="write-content"
          placeholder="content"
          ref={contentRef}
        ></textarea>
      </div>
      <div className="write-btn-box">
        <button type="submit" className="write-btn">
          일기 등록
        </button>
      </div>
    </form>
  )
}

export default DiaryWrite
