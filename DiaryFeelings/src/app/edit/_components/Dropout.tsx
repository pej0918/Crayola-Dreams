'use client'
import React,{useRef} from 'react'
import axios from 'axios'
import {Input} from "@nextui-org/react";
import {signOut} from 'next-auth/react'

interface Props {
  isOpen: boolean
  closeModal : any
  user : string
}


const Dropout = ({isOpen,closeModal,user }:Props) => {
  const pwRef = useRef<HTMLInputElement>(null)
  const dropBtn = async(e:any)=>{
    e.preventDefault()
    const result = await axios.delete('/api/edit',{
      headers: {
        'Content-Type' : 'application/json'
      },
      data : {user_id : user, password :pwRef.current!.value }
    })
    const msg = result.data.result
    if(msg === 'true'){
     await signOut()
      window.location.href = "/"

    }else if(msg === 'false'){
      alert("비밀번호를 다시 입력해 주세요")
    }
  }
  return (
    <div
    style={{
      display: isOpen ? "block" : "none",
    }}
  >
    <div className=' fixed top-0 left-0 w-screen h-screen bg-[#00000059]'></div>
    <div className='z-10 top-1/2 left-1/2 fixed  -translate-x-1/2 -translate-y-1/2 w-96 h-64 max-w-full max-h-full
     bg-slate-50 rounded-md dark:bg-[#474747]'>
      
      <div className='flex flex-col items-center mt-3 dark:bg-[#474747]'>
        
        <div className='text-center mt-4 text-xl'>정말 탈퇴하시겠어요?</div>
        <div className='w-5/6 text-center text-large mt-4'>해당 계정은 삭제되며 복구되지 않습니다</div>
        <div className='mt-8'>
        <Input key={"outside-left"} type="password" label="비밀번호 입력" labelPlacement={"outside-left"} 
        radius='md'variant= "faded" ref={pwRef}
         />

        </div>
        
        
          <div className='flex  justify-items-center space-x-8  w-3/5 mt-4 '>
            <div className=' bg-red-600 w-1/2 text-center h-8 text-white flex justify-center rounded-md'> <button onClick={dropBtn}>확인</button></div>
            <div className=' bg-stone-950 w-1/2 text-center h-8 text-white flex justify-center rounded-md'> <button onClick={closeModal}>취소</button> </div>
          </div>
        
      </div>
      
      
      
      
      
    </div>
  </div>
  )
}

export default Dropout