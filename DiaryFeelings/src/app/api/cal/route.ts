// //cal/route.ts
// import { NextRequest, NextResponse } from 'next/server'
// import queryPromise from '@/app/lib/db'
// import { verifyJwt } from '@/app/lib/jwt'

// interface reqBody {
//   date: string,
//   userId: string,
//   page: string
// }

// //
// export async function GET(req: NextRequest, res: NextResponse) {
//   try {
//     const year = req.nextUrl.searchParams.get('year') as string
//     const month = req.nextUrl.searchParams.get('month') as string
//     const user = req.nextUrl.searchParams.get('userId') as string
//     const accessToken = req.headers.get('Authorization')?.split('mlru ')[1] as string;

//     // 헤더에 토큰이 없거나, 토큰 복호화 실패하면 리턴.
//     if(!accessToken || !verifyJwt(accessToken)) {
//         return new Response(JSON.stringify({"result":"No Authorization"}))
//     }

//     let sql = `SELECT diary_number, diary_userEmo, created_at, diary_userDate FROM tb_diary WHERE MONTH(created_at) = ? AND YEAR(created_at) = ? AND user_id = ? `
//     let result = await queryPromise(sql, [month, year, user]);

//     return NextResponse.json({ result })
//   } catch (error) {
//     console.error('에러 발생:', error)
//     return NextResponse.json({ result: 'error' })
//   }
// }

// export const POST = async(req: Request, res: NextResponse) => {
//   const body: reqBody = await req.json()
//   const accessToken = req.headers.get('Authorization')?.split('mlru ')[1] as string;
//   if(!accessToken || !verifyJwt(accessToken)) {
//     return new Response(JSON.stringify({"result":"No Authorization"}))
//   }
//   const date = body.date
//   const user = body.userId
//   const curPage = body.page

//   const offset = isNaN((parseInt(curPage) - 1) * 6)
//     ? 0
//     : (parseInt(curPage) - 1) * 6
//   const getNum = 6

//   let sql = 'SELECT count(*) FROM tb_diary WHERE user_id = ? '
//   sql += 'and DATE(diary_userDate) = ?'
//   let result = await queryPromise(sql, [user, date])
//   const total = result[0]['count(*)']
//   sql = `SELECT A.*, B.image_src FROM tb_diary as A LEFT JOIN tb_image as B ON A.diary_number = B.diary_number WHERE A.user_id = ? and DATE(A.diary_userDate) = ? LIMIT ${getNum} OFFSET ${offset}`
//   result = await queryPromise(sql, [user, date])
//   sql = 'SELECT user_image FROM tb_user WHERE user_id = ?';
//   const image = await queryPromise(sql, [user])
//   return NextResponse.json({result: result, total: total, user_image: image[0]})
// }
