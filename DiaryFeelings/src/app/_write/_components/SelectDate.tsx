/*
  select date component
*/
'use client'

import React, { useEffect, useState, useRef } from 'react'
import '../../write/write.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { NextPage } from 'next'
import { POST } from '@/app/api/diary/route'
import { NextRequest, NextResponse } from 'next/server'

const SelectDate: NextPage = () => {
  // useRef로 date, title 가져오기
  const titleRef = useRef<HTMLTextAreaElement>(null)
  const dateRef = useRef<HTMLInputElement>(null)

  // select date from calendar
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

  return (
    <div className="write-tit">
      {/* select date */}
      <DatePicker
        className="write-date"
        dateFormat="yyyy.MM.dd" // format of edate
        shouldCloseOnSelect // select date close calendar
        minDate={new Date('2000-01-01')} // can't select before minDate
        maxDate={new Date()} // can't select after maxDate
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        showPopperArrow={false}
      />
      <textarea placeholder="title" ref={titleRef}></textarea>
    </div>
  )
}

export default SelectDate
