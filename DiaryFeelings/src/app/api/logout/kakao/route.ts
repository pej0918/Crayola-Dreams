// import axios from 'axios'
// import { verifyJwt } from '@/app/lib/jwt'
// interface reqBody {
//   snsAccess: string
// }

// export const POST = async (req: Request) => {
//   const body: reqBody = await req.json()
//   const accessToken = req.headers
//     .get('Authorization')
//     ?.split('mlru ')[1] as string
//   // 헤더에 토큰이 없거나, 토큰 복호화 실패하면 리턴.
//   if (!accessToken || !verifyJwt(accessToken)) {
//     return new Response(JSON.stringify({ result: 'No Authorization' }))
//   }
//   const result = await axios.post(
//     `https://kapi.kakao.com/v1/user/unlink`,
//     {},
//     {
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         Authorization: `Bearer ${body.snsAccess}`,
//       },
//     },
//   )
//   const rst = result.data
//   if (rst.id) {
//     return new Response(JSON.stringify({ result: 'ok' }))
//   } else {
//     return new Response(JSON.stringify({ result: 'error' }))
//   }
// }
