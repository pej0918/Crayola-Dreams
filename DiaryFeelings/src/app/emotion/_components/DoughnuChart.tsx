import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2' // 원하는 차트 종류를 가져오세요.
import type { ChartData, ChartOptions } from 'chart.js' // 타입을 임포트하세요.

ChartJS.register(ArcElement, Tooltip, Legend)
ChartJS.defaults.color = 'black'

type BarChartProps = {
  view?: any // Adjust the type according to your needs
}
type EmotionCounts = {
  [key: string]: number
}

const emotionImg: { [key: string]: string | { src: string; text?: string } } = {
  행복: { src: '/3_love.png', text: '늘 행복해 :)' },
  놀람: { src: '/happy.png', text: '엄마야!' },
  분노: { src: '/angry.png', text: '너무 화가난다아' },
  슬픔: { src: '/sad.png', text: '너무 슬퍼 :(' },
  불안: { src: '/depress.png', text: '너무 불안불안..' },
  중립: { src: '/nothinking.png', text: '나는 아무생각이없어' },
}

export const options: ChartOptions<'pie'> = {
  // 차트 옵션을 설정하세요.
}

export const DoughnuChart: React.FC<BarChartProps> = ({ view }) => {
  const emotion = () => {
    // 전역 변수로 선언하여 반복문 밖에서 사용할 수 있도록 함
    const totalEmotionRatios: EmotionCounts = {}

    for (let i = 0; i < view.length; i++) {
      const emotionCounts: EmotionCounts = JSON.parse(view[i].diary_emotion)
      const totalEmotion: number = Object.values(emotionCounts).reduce(
        (acc, value) => acc + value,
        0,
      )

      // 현재 감정 데이터의 비율 계산
      const emotionRatios: EmotionCounts = {}
      for (const [key, value] of Object.entries(emotionCounts)) {
        emotionRatios[key] = value / totalEmotion
      }

      // 기존의 값에 현재 값을 더함
      for (const [key, value] of Object.entries(emotionRatios)) {
        if (totalEmotionRatios[key]) {
          totalEmotionRatios[key] += value
        } else {
          totalEmotionRatios[key] = value
        }
      }
    }

    // 최종 결과 출력
    return totalEmotionRatios // 계산된 값을 반환
  }
  const result = emotion() // 함수 호출 및 결과 저장

  const data: ChartData<'pie'> = {
    labels: ['행복', '기쁨', '화남', '슬픔', '불안', '생각없음'],
    datasets: [
      {
        label: '',
        data: [
          result.행복,
          result.당황,
          result.분노,
          result.슬픔,
          result.불안,
          result.중립,
        ],
        backgroundColor: [
          'rgba(240, 207, 211, 0.2)',
          'rgba(249, 207, 157, 0.2)',

          'rgba(255, 99, 132, 0.2)',
          'rgba(75, 192, 192, 0.2)',

          'rgba(181, 224, 251, 0.2)',
          'rgba(171, 171, 171, 0.2)', // 생각없음
        ],
        borderColor: [
          'rgba(240, 207, 211, 0.5)',
          'rgba(249, 207, 157, 0.5)',

          'rgba(255, 99, 132, 0.5)',
          'rgba(75, 192, 192, 0.5)',

          'rgba(181, 224, 251, 0.5)',
          'rgba(171, 171, 171, 0.5)', // 생각없음
        ],
        borderWidth: 1,
      },
    ],
  }
  return <Pie data={data} options={options} />
}
