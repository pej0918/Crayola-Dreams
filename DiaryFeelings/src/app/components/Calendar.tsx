import React, { useState, useEffect, useRef } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import moment from 'moment'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import './cal.css'
import { useRecoilValue } from 'recoil'
import { userInfo } from '@/app/lib/atoms/atom'
import { useSession } from 'next-auth/react'

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

const ModalCalendar = ({ isOpen, closeModal, setIsCalendarOpen }: any) => {
  const [value, onChange] = useState<Value>(new Date())
  const [date, setDate] = useState(new Date())
  const [dateArr, setDateArr] = useState<string[]>([])
  const dateRef = useRef<HTMLInputElement>(null)
  const user = useRecoilValue(userInfo)
  const router = useRouter()
  const { data: session } = useSession()

  const fetchDataFromDatabase = async () => {
    try {
      const result = await axios.get(`/api/cal?year=${date.getFullYear()}&month=${date.getMonth()+1}&userId=${user.id}`,
        {
          headers: {
            'Authorization':`mlru ${session?.accessToken}`
          }
        }
      );
      const data = result.data.result
      setDateArr(prev => data)
    } catch (err) {
      console.error('Calendar Error')
    }
  }

  const dateHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange((prev: any) => {
      return new Date(e.target.value)
    })
  }

  useEffect(() => {
    fetchDataFromDatabase()
  }, [])

  const dayClick = (
    value: Date,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation()

    const formattedDate = moment(value).format('YYYY-MM-DD')
    const matchingEmotion: any = dateArr.find((x: any) => moment(x.diary_userDate).format('YYYY-MM-DD') === formattedDate)
    if(matchingEmotion) {
      router.push(`/diary/cal?date=${formattedDate}&page=1`)
      setIsCalendarOpen(false)
    }
  }
  interface emotionObj {
    [key: string]: string
  }
  const emotionImg: emotionObj = {
    happy: '/joy.png',
    sad: '/sad.png',
    depress: '/depress.png',
    angry: '/angry.png',
    normal: '/nothinking.png'
  }
  const handleMarking = (
    date: Date,
    view: 'month' | 'year' | 'decade' | 'century',
  ) => {
    // "century" 값을 포함한 다른 view 값에 대한 처리를 제외합니다.
    if (view !== 'month') {
      return null
    }

    const formattedDate = moment(date).format('YYYY-MM-DD')
    const matchingEmotion: any = dateArr.find((x: any) => moment(x.diary_userDate).format('YYYY-MM-DD') === formattedDate)
    if (matchingEmotion) {
      return (
        <div className="dot" key={formattedDate}>
            <img src={`${emotionImg[matchingEmotion.diary_userEmo]}`} alt={`emotion`} />
        </div>
      )
    }

    return null
  }

  // useRef를 사용하여 달력 외부를 클릭했는지 확인할 ref 생성
  const calendarRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    fetchDataFromDatabase()
  }, [])


  const PrevButton = () => {
    const changeMonth = (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange((prev: any) => {
        const newDate = new Date(prev)
        newDate.setMonth(newDate.getMonth() - 1)
        return newDate;
      })
    }
    return (
      <span
        onClick={changeMonth}
        className='hover:text-[tomato] p-4'
      >{'<'}</span>
    )
  }
  const NextButton = () => {
    const changeMonth = (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange((prev: any) => {
        const newDate = new Date(prev)
        newDate.setMonth(newDate.getMonth() + 1)
        return newDate;
      })
    }
    return (
      <span
        onClick={changeMonth}
        className='hover:text-[tomato] p-4'
      >{'>'}
      </span>
    )
  }
  const YearButton = () => {
    // 누르면 변경되는 거 나중에 하기.
    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation()
    }
    return (
      <div
        onClick={handleClick}
      >
        <span
          className='text-lg'
        >
          {moment(value as Date).format('YYYY년 MM월')}
        </span>
      </div>
    )
  }
  return (
    <div onClick={closeModal}>
      <div
        className={`absolute w-full h-full top-20 left-0 flex justify-center items-center`}
        ref={calendarRef}
        onClick={(e) => {
          closeModal
        }}
      >
        <div
          className="calendar-container"
          onClick={(e) => {
            e.stopPropagation()
            closeModal
          }}
        >
          {' '}
          <button className="close-button" onClick={closeModal}>
            X
          </button>
        </div>
        <Calendar
          value={value}
          locale="ko"
          calendarType="gregory"
          formatDay={(locale, date) => moment(date).format('DD')}
          onClickDay={(value, e) => dayClick(value, e)}
          showNeighboringMonth={false}
          tileContent={({ date, view }) => handleMarking(date, view)}
          prevLabel={<PrevButton />}
          nextLabel={<NextButton />}
          navigationLabel={()=><YearButton />}
        />
        <input type="date" hidden ref={dateRef} onChange={dateHandle}/>
      </div>
    </div>
  )
}

export default ModalCalendar
