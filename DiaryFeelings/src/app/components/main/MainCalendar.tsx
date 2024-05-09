"use client"

import { Image } from '@nextui-org/react' 

const ModalCalendar = () => {

  // 발표할 때는 12월이니까 31개가 담긴 배열 만들기.
  const dayArr = new Array(31).fill(0);

  // 감정을 표시할 날짜들
  const dateArr = [20,21,22,24,25,26]

  const showAlert = () => {
    alert('로그인 하면 이용할 수 있어요! 😊✨')
  }
  return (
    <div className='w-full h-full flex justify-center items-center p-[5px] fade-div'>
      <div className="w-[1000px] h-full flex flex-col p-[10px] rounded-md dark:bg-[#474747]">
        <div className="flex justify-between items-center w-full">
          <div>
            {'<'}
          </div>
          <div>
            <span className="text-[20px] text-[white]">
              2023년 12월
            </span>
          </div>
          <div>
            {'>'}
          </div>
        </div>
        <div className="w-full flex item-center justify-center flex-nowrap relative h-[45px] py-[10px] mt-[20px] border-b-[2px] bg-[#e6e6fa] border-[#afa4ce]">
          <span className="absolute text-[20px] w-[135px] px-[25px] top-0 left-[35px] text-[tomato] top-[50%] translate-y-[-50%]">일</span>
          <span className="absolute text-[20px] w-[135px] px-[25px] top-0 left-[170px] top-[50%] translate-y-[-50%] text-black">월</span>
          <span className="absolute text-[20px] w-[135px] px-[25px] top-0 left-[305px] top-[50%] translate-y-[-50%] text-black">화</span>
          <span className="absolute text-[20px] w-[135px] px-[25px] top-0 left-[440px] top-[50%] translate-y-[-50%] text-black">수</span>
          <span className="absolute text-[20px] w-[135px] px-[25px] top-0 left-[575px] top-[50%] translate-y-[-50%] text-black">목</span>
          <span className="absolute text-[20px] w-[135px] px-[25px] top-0 left-[710px] top-[50%] translate-y-[-50%] text-black">금</span>
          <span className="absolute text-[20px] w-[135px] px-[25px] top-0  left-[845px] text-[blue] top-[50%] translate-y-[-50%]">토</span>
          &nbsp;
        </div>
        <div className="flex flex-wrap w-[950px] mt-[20px]">
          <span className="w-[135px]"></span>
          <span className="w-[135px]"></span>
          <span className="w-[135px]"></span>
          {
            dayArr.map((_, index) => (
              <div key={index}
                className="w-[135px] h-[75px] text-[18px] flex flex-col justify-center items-center rounded-md cursor-pointer text-black dark:text-white hover:bg-[#e6e6fa] dark:hover:bg-[#666]"
                onClick={showAlert}
                >
                <span>{index+1}</span>
                {dateArr.includes(index) && <Image src="/happy.png" className='w-[30px] h-[30px]'/>}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default ModalCalendar
