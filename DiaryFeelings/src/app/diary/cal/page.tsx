'use client'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import { useEffect, useState } from 'react'
import LottieCat from '@/app/components/LottieCat'
import NoResult from '../_components/NoResult'
import { IDiary } from '@/app/types/type'
import DiaryLayout from '../_components/DiaryLayout'
import { userInfo } from '@/app/lib/atoms/atom'
import { useRecoilValue } from 'recoil'
import Pagination from './_components/Pagination'
import { useSession } from 'next-auth/react'
const CalView = () => {
    const params = useSearchParams()
    const date = params.get('date') as string
    const user = useRecoilValue(userInfo)
    const page = params.get('page') as string
    const [view, setView] = useState([])
    const [loading, setLoading] = useState(false)
    const total = 1;
    const [userImg, setUserImg] = useState('')
    const { data: session } = useSession()

    const getData = async() => {
        const result = await axios.post(`http://121.66.158.211:3000/api/cal`, {
            date: date,
            userId: session?.user?.id,
            page: page
        },
        {
          headers: {
            'Content-Type':'application/json',
            'Authorization':`mlru ${session?.accessToken}`
          }
        }
        
        )
        const data = result.data
        setView(prev => data.result)
        setUserImg(prev => data.user_image)
    }
    useEffect(() => {
        getData()
    },[date, page])
    return (
        <>
      {loading ? (
        <LottieCat text={'읽어오고 있어요'}/>
      ) : (
        total < 1 ? (<NoResult />) : (
          <div className="w-full mt-[100px] flex flex-col justify-center items-center">
            <div className="flex flex-wrap w-[1280px] justify-start mt-[30px]">
              {view.map((data: IDiary, index: number) => (
                <DiaryLayout key={data.diary_number} data={data} userImg={userImg}/>
              ))}
            </div>
            <Pagination total={total} limit={6} page={parseInt(page)} date={date} />
          </div>
        )
      )}
    </>
    )
}

export default CalView