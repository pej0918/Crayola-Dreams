'use client'

import React from 'react'
import WriteContent from './_components/WriteContent'
import WriteTitle from './_components/WriteTitle'
// import '../write/write.css'
import SideBar from './_components/SideBar'
import DiaryWrite from './_components/DiaryWrite'
const WriteDiary = () => {
  const getData: any = (write: any) => {
    console.log(write)
  }
  return (
    <div>
      <div className="write-box">
        {/* left sidebar */}
        <SideBar />
        {/* write diary title, content */}
        <div className="write-container">
          {/* selelct emtion, date, title component*/}
          {/* <WriteTitle data={getData} /> */}
          {/* write content component */}
          {/* <WriteContent /> */}
          {/* diary register button */}
          <DiaryWrite />
        </div>
      </div>
    </div>
  )
}

export default WriteDiary
