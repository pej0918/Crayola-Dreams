'use client'

interface Props {
    hover: string
    btn: string
    setHover: (btn: string) => void
    pic: string
    title: string
    content: string
}
const MainDesc = ({hover, btn, setHover, pic, title, content}: Props) => {
    return (
        <div className="flex items-center p-[60px]">
            <div className={`flex flex-col justify-center items-start p-[20px] rounded-md cursor-pointer duration-200 ${hover === btn ? 'bg-white dark:bg-[#474747] shadow-2xl' : 'bg-gray-100 shadow-lg dark:bg-[#303030]'}`}
                onMouseOver={(() => setHover(btn))}
            >
                <div className="flex justify-center items-center mb-[15px]">
                    <div className="w-[25px] h-[25px] rounded-md shadow-lg justify-center items-center">
                        <span>{pic}</span>
                    </div>
                    <span className={`text-[20px] ml-[10px] font-bold dark:text-[#ccc] ${hover === btn ? 'dark:text-[white]' : 'dark:text-[#ccc]'}`}>{title}</span>
                </div>
                <span className={`${hover === btn ? 'dark:text-[white]' : 'dark:text-[#ccc]'}`}>{content}</span>
            </div>
        </div>
    )
}

export default MainDesc