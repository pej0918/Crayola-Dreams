"use client";

import { useRouter } from 'next/navigation'

interface Props {
    total: number;
    limit: number;
    page: number;
    date: string
}


const Pagination = ({ total, limit, page, date }: Props) => {

    const totalPage = Math.ceil(total / limit); // 총 페이지 수
    const pageCount = 5;
    const pageGroup = Math.ceil(page / pageCount); // 그룹. 1 / 5 => 1 5 / 5 => 1

    let lastPage = pageGroup * pageCount;
   // if(lastPage > totalPage) lastPage = totalPage;

    let firstPage = lastPage - (pageCount - 1);
    if(firstPage <= 0) firstPage = 1;

    const next = lastPage + 1 > totalPage ? lastPage : lastPage + 1;
    const prev = firstPage - 1 <= 0 ? 1: firstPage - 1;

    const router = useRouter();

    const Paging = () => {
        const maps = [];
        const last = lastPage > totalPage ? totalPage : lastPage
        for (let i = firstPage; i <= last; i++) {
            maps.push(
                <span
                    key={i}
                    className={`py-[2px] px-[10px] rounded-[50%] cursor-pointer ${page === i ? 'bg-[#b2a4d4] text-white' : 'text-gray-500 hover:text-[#b2a4d4] dark:text-[#eee] dark:hover:text-[#b2a4d4]'}`}
                    onClick={() => router.push(`/diary/cal?date=${date}&page=${i}`)}
                >
                    {i}
                </span>
            )
        }
        return maps;
    }

    return (
        <div className="flex px-[100px] h-[50px] border rounded-md mb-[100px] items-center justify-center dark:bg-[#474747] shadow-lg">
            <div className="flex items-center h-full">
                {
                    prev > 1 && (
                        <span
                            className="mr-[30px] cursor-pointer hover:text-[#b2a4d4]"
                            onClick={() => router.push(`/diary/cal?date=${date}&page=${prev}`)}
                        >
                            {'이전'}
                        </span>
                    )
                }
            </div>
            <div className="flex items-center h-full gap-[15px]">
                {
                    Paging()
                }
            </div>
            <div className="flex items-center h-full">
                {
                    next < totalPage && (
                        <span
                            className="ml-[30px] cursor-pointer hover:text-[#b2a4d4]"
                            onClick={() => router.push(`/diary/cal?date=${date}&page=${next}`)}
                        >
                            {'다음'}
                        </span>
                    )
                }
            </div>
        </div>
    )
};

export default Pagination;