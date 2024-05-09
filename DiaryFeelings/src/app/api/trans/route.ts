// import axios from 'axios'
// import { NextResponse } from 'next/server'
// import { verifyJwt } from '@/app/lib/jwt'

// type reqBody = {
//   text: string
// }
// type resBody = {
//   result: string
// }

// export async function POST(req: Request) {
//   const body: reqBody = await req.json()
//   const accessToken = req.headers
//     .get('Authorization')
//     ?.split('mlru ')[1] as string
//   // 헤더에 토큰이 없거나, 토큰 복호화 실패하면 리턴.
//   if (!accessToken || !verifyJwt(accessToken)) {
//     return new Response(JSON.stringify({ result: 'No Authorization' }))
//   }
//   try {
//     const res = await axios.post(`${process.env.MODEL_URL}/trans/`, {
//       text: body.text,
//     })
//     const result: resBody = res.data
//     return NextResponse.json(result.result)
//   } catch (err) {
//     console.log(err)
//     return NextResponse.json(err)
//   }
// }
