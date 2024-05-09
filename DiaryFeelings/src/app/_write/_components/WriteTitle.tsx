/*
  Write title Component
*/
'use client'

import React, { useEffect, useRef, useState } from 'react'
import '../../write/write.css'
import 'react-datepicker/dist/react-datepicker.css'
import SelectDate from './SelectDate'
import SelectEmotion from './SelectEmotion'
import SelectWeather from './SelectWeather'
import DatePicker from 'react-datepicker'

const WriteTitle = () => {
  // select date from calendar
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

  const emotionRef = useRef<HTMLImageElement>(null)
  const dateRef = useRef(null)
  const titleRef = useRef<HTMLTextAreaElement>(null)

  return (
    /* selelct emtion, date, title */

    <div className="write-header">
      <div className="img-box">
        <img
          className="write-select-img"
          ref={emotionRef}
          src="./3_love.png"
          alt="emotion"
        />
      </div>
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
          ref={dateRef}
        />
        <textarea placeholder="title" ref={titleRef}></textarea>
      </div>
    </div>
  )
}

export default WriteTitle
