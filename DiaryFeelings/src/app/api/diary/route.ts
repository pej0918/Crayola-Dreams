// import { NextRequest, NextResponse } from 'next/server'

// import axios from "axios";
// import moment from "moment";
// import queryPromise from "@/app/lib/db";
// import { verifyJwt } from "@/app/lib/jwt";
// export const api = {
//   bodyParse: false,
// }

// // GET 가져오기
// // POST 작성
// // PATCH 수정
// // DELETE 삭제
// export async function DELETE(req: NextRequest, res: NextResponse) {
//   // 작성한 일기 삭제.
//   const data = await req.json();
//   const userID = data.id;
//   const diaryNum = data.diary_number;

//   try {
//     // delete in tb_imag
//     // delete in tb_diary
//     // 다이어리를 삭제하면 다이어리 이미지도 같이 삭제됨.
//     let sql = "DELETE FROM tb_diary WHERE user_id = ? AND diary_number = ?";
//     let values = [userID, diaryNum];
//     let result = await queryPromise(sql, values);
//     return NextResponse.json({ msg: "success" });
//   } catch (err) {
//     return NextResponse.json({ result: 'error' })
//   }
// }

// export const GET = async (req: NextRequest, res: NextResponse) => {
//   const accessToken = req.headers.get("Authorization")?.split("mlru ")[1] as string;
//   if(!accessToken || !verifyJwt(accessToken)) {
//     return new Response(JSON.stringify({"result":"No Authorization"}))
//   }

//   // 현재 페이지 번호
//   const curPage = req.nextUrl.searchParams.get("page") as string;
//   const userId = req.nextUrl.searchParams.get("userId") as string;

//   // 시작 날짜
//   const startDate = req.nextUrl.searchParams.get("s") as string;

//   // 종료 날짜
//   const endDate = req.nextUrl.searchParams.get("e") as string;

//   // YYYY-MM-DD로 변경.
//   const start = moment(new Date(startDate)).format("YYYY-MM-DD");
//   const end = moment(new Date(endDate)).format("YYYY-MM-DD");

//   // 주소는 문자열이어서 숫자로 변환.
//   // 변환했는데 숫자가 아닐 경우 0으로.
//   const offset = isNaN((parseInt(curPage) - 1) * 6)
//     ? 0
//     : (parseInt(curPage) - 1) * 6
//   const getNum = 6

//   let sql = "SELECT count(*) FROM tb_diary WHERE user_id = ? ";
//   sql += `and DATE(created_at) BETWEEN '${start}' and '${end}' ORDER BY created_at DESC`;
//   let result = await queryPromise(sql, [userId]);
//   const total = result[0]["count(*)"];
//   sql = `SELECT A.*, B.image_src FROM tb_diary as A LEFT JOIN tb_image as B ON A.diary_number = B.diary_number WHERE A.user_id = ? and DATE(A.created_at) BETWEEN '${start}' and '${end}' ORDER BY A.created_at DESC LIMIT ${getNum} OFFSET ${offset} `;
//   let values = [userId];
//   result = await queryPromise(sql, values);
//   sql = "SELECT user_image FROM tb_user WHERE user_id = ?";
//   const image = await queryPromise(sql, [userId]);

//   // 페이징을 위한 총 게시글 수
//   // 다이어리와 관련된 이미지를 가져오기 위해 left join.
//   // 왼쪽은 다 나오고, 오른쪽은 조건에 맞는 것만 가져옴.
//   // 이미지가 없을 수도 있어서.
//   return NextResponse.json({
//     result: result,
//     total: total,
//     userImage: image[0],
//   })
// }

// export async function POST(req: NextRequest, res: NextResponse) {
//   const data = await req.formData();
//   const accessToken = req.headers.get("Authorization")?.split("mlru ")[1] as string;
//   if(!accessToken || !verifyJwt(accessToken)) {
//     return new Response(JSON.stringify({"result":"No Authorization"}))
//   }
//   const title = data.get("title") as string;
//   const content = data.get("content") as string;
//   console.log(content);
//   const weather = data.get("weather") as string;
//   const emotion = data.get("emotion") as string;
//   const fonts = data.get("fonts") as string;
//   let date: string | Date = data.get("datetime") as string;
//   date = new Date(date) as Date;
//   const id = data.get("id") as string;
//   const name = data.get("name") as string;
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

//   const maxEmotion = Object.entries(predictEmo.data).reduce(
//     (max: any, [key, value]: any) => {
//       return value > max[1] ? [key, value] : max
//     },
//     ['', -Infinity],
//   )

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

//   const weatherQuery: { [key: string]: string } = {
//     맑음: 'sunny',
//     흐림: 'cloudy',
//     비: 'rainy',
//     바람: 'windy',
//     눈: 'snowy',
//   }
//   const emotionQuery: { [key: string]: string } = {
//     중립: 'normal',
//     슬픔: 'sadness',
//     분노: 'angry',
//     놀람: 'amazing',
//     행복: 'happiness',
//     불안: 'unhappiness',
//   }
//   const query = `${weather} day, feel ${
//     emotionQuery[maxEmotion[0]]
//   } in the picture`;
//   // ex) sunny day, feel happy in the picture.

//   let imgSrc = "";
//   const predictImg = await axios.post(
//     `${process.env.BASE_URL}/api/img`,
//     { text: query },
//     {
//       headers: {
//         Authorization: `mlru ${accessToken}`,
//       },
//     },
//   )
//   console.log(predictImg.data)
//   imgSrc += `${predictImg.data.result},`
//   console.log(imgSrc)
//   const img = data.get('img') as File
//   if (img) {
//     const fb = new FormData()
//     fb.append('image', img)
//     const result = await axios.post('https://api.imgur.com/3/upload', fb, {
//       headers: {
//         Authorization: `Client-ID ${process.env.IMGUR_KEY}`,
//         Accept: 'application/json',
//       },
//     })
//     imgSrc += `${result.data.data.link}`
//   }

//   try {
//     let sql = 'INSERT INTO tb_diary VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
//     let values = [
//       null,
//       id,
//       name,
//       title,
//       content,
//       predictEmo.data,
//       weather,
//       fonts,
//       null,
//       predictAdvice.data,
//       new Date(),
//       new Date(),
//       emotion,
//       date,
//     ];
//     const result = await queryPromise(sql, values);
//     sql = "INSERT INTO tb_image VALUES(?,?,?,?,?)";
//     values = [null, result.insertId, imgSrc, "user", new Date()];
//     await queryPromise(sql, values);
//     return NextResponse.json({ result: result });
//   } catch (err) {
//     console.log(err)
//     return NextResponse.json({ result: 'error' })
//   }
// }

// export const PUT = async (req: Request) => {
//   const data = await req.formData()
//   const images: any[] = []
//   data.forEach((v, k) => {
//     images.push(v)
//   })
//   const imgs: any[] = []

//   const uploadImages = async () => {
//     for (const v of images) {
//       const fb = new FormData()
//       fb.append('image', v)

//       try {
//         const result = await axios.post('https://api.imgur.com/3/upload', fb, {
//           headers: {
//             Authorization: `Client-ID ${process.env.IMGUR_KEY}`,
//             Accept: 'application/json',
//           },
//         })
//         imgs.push(result.data.data.link)
//       } catch (error) {
//         console.log(error)
//         return 0
//       }
//     }
//     return imgs
//   }

//   const result = await uploadImages()
//   if (result === 0) {
//     return NextResponse.json({ result: 'error' })
//   }
//   console.log(result)

//   return NextResponse.json({ result: imgs })
// }
