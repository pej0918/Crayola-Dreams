// import { signJwtAccessToken, signJwtRefreshToken } from './jwt'
// import queryPromise from '@/app/lib/db'
// const crypto = require('crypto')

// export const socialLogin = async (user: any, provider: string) => {
//   try {
//     let sql = ''
//     sql = 'SELECT user_id FROM tb_user WHERE user_id = ?'
//     let result = await queryPromise(sql, [user.id])
//     if (result.length < 1) {
//       // 회원이 아니니까 db에 등록.
//       sql = 'INSERT INTO tb_user VALUES(?,?,?,?,?,?,?,?,?)'
//       const salt = crypto.randomBytes(64).toString('base64')
//       // salt 생성.

//       const hashPassword = crypto
//         .createHash('sha512')
//         .update(provider + salt)
//         .digest('hex')
//       // 비밀번호 뒤에 salt를 붙여서 암호화.

//       result = await queryPromise(sql, [
//         null,
//         user.id,
//         hashPassword,
//         salt,
//         user.name,
//         provider,
//         new Date(),
//         new Date(),
//         'no image',
//       ])
//     }
//     const tokenUser = {
//       user_id: user.id,
//     }
//     const accessToken = signJwtAccessToken(tokenUser)
//     const refreshToken = await signJwtRefreshToken(user.id)
//     const rst = {
//       ...user,
//       accessToken,
//       refreshToken,
//     }
//     return rst
//   } catch (e) {
//     console.log(e)
//     return false
//   }
// }
