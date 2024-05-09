// import { NextRequest, NextResponse } from 'next/server'
// import queryPromise from '@/app/lib/db'
// import { verifyJwt } from '@/app/lib/jwt'
// export const api = {
//   bodyParse: false,
// }

// // GET search keyword from DB
// export const GET = async (req: NextRequest, res: NextResponse) => {
//   const accessToken = req.headers.get('Authorization')?.split('mlru ')[1] as string
//   if(!accessToken || !verifyJwt(accessToken)) {
//     return new Response(JSON.stringify({"result":"No Authorization"}))
//   }
//   try {
//     const curPage = req.nextUrl.searchParams.get('page') as string
//     const userId = req.nextUrl.searchParams.get('userId') as string
//     const keyword = req.nextUrl.searchParams.get('keyword') as String
//     const offset = (parseInt(curPage) - 1) * 6
//     const getNum = 6

//     /* get diary that corresponding to the keyword */

//     // 승연 검색로직
//     let sql = `SELECT count(*) FROM tb_diary WHERE user_id = ? AND diary_content LIKE ?`
//     let values = [userId, `%${keyword}%`]
//     let result = await queryPromise(sql, values)
//     const total = result[0]['count(*)']
//     sql = `SELECT A.*, B.image_src FROM tb_diary as A LEFT JOIN tb_image as B ON A.diary_number = B.diary_number WHERE A.user_id = ? AND A.diary_content LIKE ? ORDER BY A.diary_userDate DESC LIMIT ${getNum} OFFSET ${offset}`
//     result = await queryPromise(sql, values)
//     sql = 'SELECT user_image FROM tb_user WHERE user_id = ?';
//     const image = await queryPromise(sql, [userId])
//     return NextResponse.json({
//       result: result,
//       total: total,
//       userImage: image[0],
//       msg: 'success',
//     })
//   } catch (error) {
//     console.error('DB error', error)
//     return NextResponse.json({ msg: 'error' })
//   }
// }
