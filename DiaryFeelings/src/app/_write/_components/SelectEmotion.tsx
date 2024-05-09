'use client'

import React from 'react'
import '../../write/write.css'

const SelectEmotion = () => {
  return (
    <div className="img-box">
      {/* <div className="emotion-list">
        {EmotionList.map((emotion) => (
          <img
            className="write-img-list"
            src={emotion.src}
            key={emotion.value}
          />
        ))}
      </div> */}
      <img className="write-select-img" src="./3_love.png" alt="emotion" />
    </div>
  )
}

export default SelectEmotion
