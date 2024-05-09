import React, { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'

// 타입 정의
type Dataset = {
  label: string
  data: any[]
  backgroundColor: string[]
  borderColor: string[]
  borderWidth: number
}

type Data = {
  labels: string[]
  datasets: Dataset[]
}

type Options = {
  scales: {
    x: {
      grid: {
        display: boolean
      }
    }
    y: {
      beginAtZero: boolean
      max: number
      grid: {
        display: boolean
      }
    }
  }
}

type BarChartProps = {
  view?: any // Adjust the type according to your needs
}
type EmotionCounts = {
  [key: string]: number
}

const emotionImg: { [key: string]: string | { src: string; text?: string } } = {
  행복: { src: '/3_love.png', text: '늘 행복해 :)' },
  당황: { src: '/happy.png', text: '엄마야!' },
  분노: { src: '/angry.png', text: '너무 화가난다아' },
  슬픔: { src: '/sad.png', text: '너무 슬퍼 :(' },
  불안: { src: '/depress.png', text: '너무 불안불안..' },
  중립: { src: '/nothinking.png', text: '나는 아무생각이없어' },
}

const BarChartDark: React.FC<BarChartProps> = ({ view }) => {
  const chartRef = useRef<HTMLCanvasElement>(null) // ref 타입 명시
  let chartInstance: Chart | null = null // chartInstance 타입 명시

  // 감정 데이터 추출

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

  // emotion()
  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d') // optional chaining 사용

    const createChart = () => {
      Chart.register(...registerables)
      Chart.defaults.color = 'white'
      chartInstance = new Chart(ctx as CanvasRenderingContext2D, {
        // ctx 타입 단언
        type: 'bar',
        data: {
          labels: [
            '행복',
            '당황',
            // '사랑',
            '분노',
            '슬픔',
            // '우울',
            '불안',
            '중립',
          ],
          datasets: [
            {
              label: '11월 감정 기록',
              data: [
                result.행복,
                result.당황,
                result.분노,
                result.슬픔,
                result.불안,
                result.중립,
              ],
              backgroundColor: [
                'rgba(240, 207, 211, 0.8)',
                'rgba(255, 206, 86, 0.8)',

                // 'rgba(239, 203, 207, 0.2)', // 사랑
                'rgba(255, 99, 132, 0.8)',
                'rgba(75, 192, 192, 0.8)',

                // 'rgba(174, 221, 251, 0.2)', // 우울
                'rgba(181, 224, 251, 0.8)',
                'rgba(171, 171, 171, 0.8)', // 생각없음
              ],
              borderColor: [
                'rgba(240, 207, 211, 1)',
                'rgba(255, 206, 86, 1)',
                // 'rgba(239, 203, 207, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(75, 192, 192, 1)',
                // 'rgba(174, 221, 251, 1)', //우울
                'rgba(181, 224, 251, 1)',
                'rgba(171, 171, 171, 1)', // 생각없음
              ],
              borderWidth: 1,
            },
          ],
        } as unknown as Data, // data 타입 단언
        options: {
          // 다른 차트 옵션들
          plugins: {
            example: { option1: 'value1', option2: 'value2' }, // 플러그인 옵션
            labels: {},
            title: {
              font: {
                size: 30,
              },
            },
          },

          scales: {
            x: {
              grid: {
                display: false, // Set display to false to hide grid lines
              },
              ticks: {
                font: {
                  size: 20,
                },
              },
            },
            y: {
              beginAtZero: true,
              max: 20,
              grid: {
                display: false, // Set display to false to hide grid lines
              },
            },
          },
        } as Options, // options 타입 단언
      })
    }
    const canvasElement = chartRef.current
    if (canvasElement) {
      // canvasElement.style.height = '200px'
      // canvasElement.style.width = '400px'
    }
    const destroyChart = () => {
      if (chartInstance) {
        chartInstance.destroy()
        chartInstance = null
      }

      // parentNode가 HTMLElement 또는 null일 수 있음을 TypeScript에게 알려줍니다.
      const parentNode = chartRef.current?.parentNode as HTMLElement | null

      // parentNode가 존재하고 style 속성이 있다면 높이를 변경합니다.
      if (parentNode?.style) {
        parentNode.style.height = '500px'
      }
    }

    destroyChart() // 기존 차트 파괴
    createChart() // 새로운 차트 생성

    return () => {
      destroyChart() // 컴포넌트가 unmount될 때 차트 파괴
      // 원하는 높이로 변경
    }
  }, [view])

  return <canvas ref={chartRef} className="" />
}

export default BarChartDark
