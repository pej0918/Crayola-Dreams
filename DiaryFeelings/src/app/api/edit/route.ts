// import queryPromise from '@/app/lib/db'
// import { NextRequest, NextResponse } from 'next/server'
// import axios from 'axios'
// const crypto = require('crypto')

// interface reqBody {
//   user_id?: string
//   password?: string
//   user_name?: string
// }

// // PATCH 아이디에 따른 정보 제공
// export const PATCH = async (req: Request) => {
//   const body: reqBody = await req.json()

//   try {
//     let sql =
//       'SELECT user_id,user_name, user_image from tb_user WHERE user_id = ?'
//     const chk = await queryPromise(sql, [body.user_id])

//     if (chk.length >= 1) {
//       // 아이디 존재가 존재하면 아이디,닉네임,사진정보 가져오기
//       return NextResponse.json({ result: chk })
//     }
//   } catch (err: any) {
//     console.log(err)
//     return NextResponse.json({ result: '에러' })
//   }
// }

// //  PUT 정보 수정

// export const PUT = async (req: Request) => {
//   const data = await req.formData()
//   const img = data.get('img') as File
//   const name = data.get('user_name') as string
//   const id = data.get('user_id') as string
//   const pw = data.get('password') as string

//   let imgSrc = ''
//   if (img) {
//     const fb = new FormData()
//     fb.append('image', img)
//     const result = await axios.post('https://api.imgur.com/3/upload', fb, {
//       headers: {
//         Authorization: `Client-ID ${process.env.IMGUR_KEY}`,
//         Accept: 'application/json',
//       },
//     })
//     imgSrc = result.data.data.link
//   }
//   console.log('이미지 주소는', imgSrc)

//   try {
//     let sql =
//       'update tb_user set user_image = ? , user_name = ? , user_password = ? ,user_salt =?  where user_id = ?'

//     // salt 생성.
//     const salt = crypto.randomBytes(64).toString('base64')
//     // 암호화.
//     const hashPassword = crypto
//       .createHash('sha512')
//       .update(pw + salt)
//       .digest('hex')
//     await queryPromise(sql, [imgSrc, name, hashPassword, salt, id])
//     sql = 'UPDATE tb_diary SET user_name = ? WHERE user_id = ?'
//     const result = await queryPromise(sql, [name, id]) // 다이어리 닉네임도 변경.
//     // 처리 시간 오래 걸리는 듯.
//     return new Response(JSON.stringify({ result: '완료' }))
//   } catch (err: any) {
//     return new Response(JSON.stringify('error'))
//   }
// }

// // 현진 감정페이지 목표,다짐 텍스트
// export async function POST(req: NextRequest, res: NextResponse) {
//   try {
//     const data = await req.json()
//     const sql = `UPDATE tb_user
//     SET user_desc = ?
//     WHERE user_id = ?`

//     const value = [data.userDesc, data.userId]
//     const result = await queryPromise(sql, value)
//     return NextResponse.json({ result: result }) // NextResponse 객체를 반환하는 방법
//   } catch (error) {
//     console.log(error)
//     return NextResponse.json({ result: 'error' })
//   }
// }

// // 회원탈퇴
// export const DELETE = async (req: Request) => {
//   const body: reqBody = await req.json()

//   // 아이디는 이미 로그인 한 상태니까
//   // 비밀번호만 검증 후
//   // 맞으면 탈퇴, 아니면 리턴.
//   try {
//     let sql = 'SELECT user_password, user_salt from tb_user WHERE user_id = ?'
//     const chk = await queryPromise(sql, [body.user_id])
//     if (chk.length < 1) {
//       // 아이디에 맞는 비밀번호를 못 찾음.
//       return NextResponse.json({ result: '정보 없음' })
//     }
//     const salt = chk[0].user_salt
//     const db_pw = chk[0].user_password
//     // 현재는 테스트 계정들이 sha512로 암호화 되어 있지만
//     // 나중에 bcrypt로 암호화 알고리즘 수정하기.
//     const hashPassword = crypto
//       .createHash('sha512')
//       .update(body.password + salt)
//       .digest('hex')
//     const result = db_pw === hashPassword
//     if (result) {
//       // 비밀번호 일치.
//       sql = 'DELETE FROM tb_user WHERE user_id = ?'
//       await queryPromise(sql, [body.user_id])
//       return NextResponse.json({ result: 'true' })
//     } else {
//       return NextResponse.json({ result: 'false' })
//     }
//   } catch (err: any) {
//     console.log(err)
//     return NextResponse.json({ result: 'err' })
//   }
// }
