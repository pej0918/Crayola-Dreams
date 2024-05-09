// import { NextResponse } from 'next/server'
// import axios from 'axios'
// import moment from 'moment'
// import queryPromise from '@/app/lib/db'
// import { verifyJwt } from '@/app/lib/jwt'

// interface Props {
//   id: string
// }

// // GET 가져오기
// export const GET = async (req: Request, { params }: { params: Props }) => {
//   const accessToken = req.headers.get("Authorization")?.split("mlru ")[1] as string;
//   if(!accessToken || !verifyJwt(accessToken)) {
//     return new Response(JSON.stringify({"result":"No Authorization"}))
//   }

//   const id = parseInt(params.id)

//   try {
//     let sql =
//       'SELECT A.*, B.image_src FROM tb_diary as A LEFT JOIN tb_image as B ON A.diary_number = B.diary_number WHERE A.diary_number = ?'
//     const result = await queryPromise(sql, [id])
//     return NextResponse.json({ result: result[0], msg:'success' })
//   } catch (err) {
//     console.log('backerror',err)
//     return NextResponse.json({ result: err, msg: 'error' })
//   }
// }

// // PATCH 수정하기
// export const PATCH = async (req: Request) => {
//   const data = await req.formData()
//   const accessToken = req.headers.get('Authorization')?.split('mlru ')[1] as string
//   if(!accessToken || !verifyJwt(accessToken)) {
//     return new Response(JSON.stringify({"result":"No Authorization"}))
//   }
//   const title = data.get('title') as string
//   const content = data.get('content') as string
//   const emotion = data.get('emotion') as string
//   const font = data.get('font') as string
//   const weather = data.get('weather') as string
//   let date: string | Date = data.get('datetime') as string
//   date = new Date(date) as Date

//   const id = data.get('id') as string
//   const name = data.get('name') as string
//   const diary_num = parseInt(data.get('diary_num') as string)

//   const predictEmo = await axios.post(
//     `${process.env.BASE_URL}/api/emotion`,
//     { text: content },
//     {
//       headers: {
//         Authorization: `mlru ${accessToken}`,
//       },
//     },
//   )
//   console.log(predictEmo.data) // 감정 숫자.

//   const predictSumm = await axios.post(
//     `${process.env.BASE_URL}/api/summary`,
//     { text: content },
//     {
//       headers: {
//         Authorization: `mlru ${accessToken}`,
//       },
//     },
//   )

//   console.log(predictSumm.data) // 내용 요약.

//   const predictAdvice = await axios.post(
//     `${process.env.BASE_URL}/api/advice`,
//     { text: predictSumm.data },
//     {
//       headers: {
//         Authorization: `mlru ${accessToken}`,
//       },
//     },
//   )
//   console.log(predictAdvice.data) // 조언
//   try {
//     let sql = 'UPDATE tb_diary SET '
//     sql += 'diary_title = ?, '
//     sql += 'diary_userDate = ?, '
//     sql += 'diary_weather = ?, '
//     sql += 'diary_content = ?, '
//     sql += 'updated_at = ?, '
//     sql += 'diary_userEmo = ?, '
//     sql += 'diary_font = ?, '
//     sql += 'diary_advice = ?, '
//     sql += 'diary_emotion = ? '
//     sql += 'WHERE user_id = ? '
//     sql += 'and diary_number = ?'
//     let values = [title, new Date(date), weather, content, new Date(), emotion, font, predictAdvice.data, predictEmo.data, id, diary_num]
//     // 제목, 시간, 날씨, 내용, 수정 시간
//     const result = await queryPromise(sql, values)
//     return NextResponse.json({ result: 'done' })
//   } catch (err) {
//     console.log(err)
//     return NextResponse.json({ result: 'err' })
//   }
//   // 내용은 바뀔 수가 있어서
//   // 다시 감정 분석
//   // 이미지 생성은... 일단 수정 시에는 하지 않기로.
// }
