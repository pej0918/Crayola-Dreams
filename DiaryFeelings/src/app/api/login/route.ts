// import { signJwtAccessToken, signJwtRefreshToken } from '@/app/lib/jwt'
// import queryPromise from '@/app/lib/db'
// import { NextResponse } from 'next/server'
// const crypto = require('crypto')

// interface reqBody {
//   username: string
//   password: string
// }

// export const POST = async (req: Request) => {
//   const body: reqBody = await req.json()
//   let sql =
//     'SELECT user_id, user_password, user_name, user_salt FROM tb_user WHERE user_id = ?'
//   let result = await queryPromise(sql, [body.username])
//   if (result.length < 1)
//     return NextResponse.json({ result: 'No user' })
//   const hashPassword = crypto
//     .createHash('sha512')
//     .update(body.password + result[0].user_salt)
//     .digest('hex')
//   const chk = hashPassword === result[0].user_password
//   if (chk) {
//     const user = {
//       user_id: result[0].user_id,
//       user_name: result[0].user_name,
//     }
//     const accessToken = signJwtAccessToken({ user_id: user.user_id })
//     const refreshToken = await signJwtRefreshToken(body.username)
//     const rst = {
//       ...user,
//       accessToken,
//       refreshToken,
//     }
//     return new Response(JSON.stringify(rst))
//   } else return NextResponse.json({ result: 'wrong password' })
// }
