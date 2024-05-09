/*
  Write Content Component
*/
'use client'

import React, { useEffect, useState } from 'react'
import '../../write/write.css'
import 'react-datepicker/dist/react-datepicker.css'

const WriteContent = () => {
  return (
    /* write content area */
    <div className="write-cont">
      <textarea name="write-content" placeholder="content"></textarea>
    </div>
  )
}

export default WriteContent
