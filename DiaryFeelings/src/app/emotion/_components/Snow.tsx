import React from 'react'
import style from '../emotion.module.css'
import { Image } from '@nextui-org/react'
interface Emotion {
  className?: string
}

const Snow: React.FC<Emotion> = () => {
  return (
    <div className="-z-50">
      <div className={style.snowflakes} aria-hidden="true">
        <div className="intro">
          <a href="https://codeconvey.com"></a>
        </div>

        <div className={style.snowflake}>
          <Image src="/snowflake-free.png" width={20} height={20}></Image>
        </div>
        <div className={style.snowflake}>
          <Image src="/snowflake.png" width={20} height={20}></Image>
        </div>
        <div className={style.snowflake}>
          <Image src="/snowflake-four.png" width={20} height={20}></Image>
        </div>

        <div className={style.snowflake}>
          <Image src="/snowflake.png" width={20} height={20}></Image>
        </div>

        <div className={style.snowflake}>
          <Image src="/snowflake-free.png" width={20} height={20}></Image>
        </div>
        <div className={style.snowflake}>
          <Image src="/snowflake-four.png" width={20} height={20}></Image>
        </div>

        <div className={style.snowflake}>
          <Image src="/snowflake.png" width={20} height={20}></Image>
        </div>

        <div className={style.snowflake}>
          <Image src="/snowflake-free.png" width={20} height={20}></Image>
        </div>
        <div className={style.snowflake}>
          <Image src="/snowflake-four.png" width={20} height={20}></Image>
        </div>
      </div>
    </div>
  )
}

export default Snow
