// import mysql, { Connection } from 'mysql2/promise'

// const conn = {
//   host: process.env.DB_HOST_NAME,
//   user: process.env.DB_USER_NAME,
//   password: process.env.DB_USER_PW,
//   database: process.env.DB_USER_DB,
//   port: 3307,
// }

// const createConnection = async (): Promise<Connection> => {
//   return await mysql.createConnection(conn)
// }

// // Promise로 래핑.
// const queryPromise = async (
//   queryString: string,
//   values: any[],
// ): Promise<any> => {
//   const conn = await createConnection()
//   try {
//     const [results] = await conn.execute(queryString, values)
//     return results
//   } catch (err: any) {
//     throw err
//   } finally {
//     // 쿼리 실행 후 닫아줘야 함.
//     conn.end()
//   }
// }

// export default queryPromise
