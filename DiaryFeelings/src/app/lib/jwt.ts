// import jwt, { Jwt, JwtPayload } from 'jsonwebtoken'
// // import queryPromise from '@/app/lib/db'
// interface signOption {
//     expiresIn: string | number
// }

// const DEFAULT_SIGN_OPTION: signOption = {
//     expiresIn: '1h',
// }

// export const signJwtAccessToken = (
//     payload: JwtPayload,
//     options: signOption = DEFAULT_SIGN_OPTION,
// ) => {
//     console.lof('JwtPayload', JwtPayload)
//     const secret_key = process.env.SECRET_KEY
//     const token = jwt.sign(payload, secret_key!, options)
//     return token
// }

// export const signJwtRefreshToken = async (refresh_token: string) => {
//     try {
//         // 토큰 생성 로직을 백엔드 API에 요청하는 코드로 변경
//         const res = await fetch(
//             'http://43.202.125.125:8000/dj-rest-auth/token/refresh',
//             {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ refresh: refresh_token }),
//             },
//         )
//         console.log('signJwtRefreshToken', res)
//         if (res.ok) {
//             const { refresh, access } = await res.json()
//             return { accessToken: access, refreshToken: refresh }
//         } else {
//             console.error('Error fetching refresh and access')
//             return null
//         }
//     } catch (error) {
//         console.error('Error creating refresh and access token:', error)
//         return null
//     }
//     // const secret_key = process.env.SECRET_KEY
//     // const token = jwt.sign({}, secret_key!, {
//     //     expiresIn: '14d',
//     // })
//     // let sql = 'SELECT user_token FROM tb_refresh_token WHERE user_id = ?'
//     // let result = await queryPromise(sql, [user_id])
//     // if (result.length < 1) {
//     //     // 값이 없다면 새로 생성해야 됨.
//     //     sql = 'INSERT INTO tb_refresh_token VALUES(?,?)'
//     //     result = await queryPromise(sql, [user_id, token])
//     // } else {
//     //     // 값이 있다면 업데이트 해야 됨.
//     //     sql = 'UPDATE TOKEN SET tb_refresh_token = ? WHERE user_id = ?'
//     //     sql = 'UPDATE tb_refresh_token SET user_token = ? WHERE user_id = ?'
//     //     result = await queryPromise(sql, [token, user_id])
//     // }
//     // return token
// }

// export const verifyJwt = (token: string) => {
//     try {
//         const res = await fetch(
//             `http://43.202.125.125:8000/dj-rest-auth/token/verify`,
//             {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     token: token,
//                 }),
//             },
//         )
//         console.log('verifyJwt', res)
//         return res.ok
//         // const secret_key = process.env.SECRET_KEY
//         // const decoded = jwt.verify(token, secret_key!) as JwtPayload
//         // const currentTime = Math.floor(Date.now() / 1000) - (60000 * 5) // 갱신할 시간.
//         // if(decoded.exp && decoded.exp < currentTime) {
//         //   return 'refresh';
//         // }
//         // return decoded as JwtPayload
//     } catch (err) {
//         // 에러.
//         // return 'signout'
//         return false
//     }
// }

// export const verifyRefresh = (token: string) => {
//     try {
//         const res = await fetch(
//             `http://43.202.125.125:8000/dj-rest-auth/token/verify`,
//             {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     token: token,
//                 }),
//             },
//         )
//         console.log('verifyRefresh', res)
//         return res.ok
//         // const secret_key = process.env.SECRET_KEY
//         // const decoded = jwt.verify(token, secret_key!)
//         // return decoded as JwtPayload
//     } catch (err) {
//         // console.log(err)
//         // return null
//         return false
//     }
// }
