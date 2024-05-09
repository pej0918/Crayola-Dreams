import type { Config } from 'tailwindcss'
const { nextui } = require('@nextui-org/react')

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  // tailwind
  theme: {
    screens: {
      sm: { max: '640px' },
      // => @media (min-width: 640px) { ... }

      md: { max: '768px' },
      // => @media (min-width: 768px) { ... }

      lg: { max: '1024px' },
      // => @media (min-width: 1024px) { ... }

      xl: { max: '1280px' },
      // => @media (min-width: 1280px) { ... }

      '2xl': { max: '1536px' },
      // => @media (min-width: 1536px) { ... }
    },
    fontSize: {
      sm: ['14px', '20px'],
      base: ['17px', '24px'],
      lg: ['20px', '28px'],
      xl: ['24px', '32px'],
      xxl: ['28px', '36px'],
      xxxl: ['32px', '40px'],
    },
    extend: {
      backgroundImage: {},
      colors: {
        purple: '#b2a4d4',
      },
    },
    fontFamily: {
      pretendard: ['Pretendard-Regular'], // 프리텐다드
      bareunhipi: ['Bareun_hipi'], // 바른히피
      omyu: ['omyu_pretty'], // 오뮤 다예쁨
      nanum: ['Nanum_Gothic'], // 네이버 나눔
      ridi: ['RIDIBatang'], // 리디바탕
      ainmom: ['Ainmom'], // 아인맘
      kyobo: ['KyoboHand'], // 교보손
      shin: ['ShinDongYupHandwriting-R'], // 신동
    },
  },
  darkMode: 'class',

  // next js plugin
  plugins: [
    require('@nextui-org/react'),
    nextui({
      themes: {
        light: {
          colors: {
            background: '#FAFAFA', // or DEFAULT
            foreground: '#11181C', // or 50 to 900 DEFAULT
            primary: {
              //... 50 to 900
              foreground: '#FFFFFF',
              DEFAULT: '#006FEE',
            },
            // ... rest of the colors
          },
        },
        dark: {
          colors: {
            background: '#27272a',
            foreground: '#ECEDEE', // or 50 to 900 DEFAULT

            primary: {
              //... 50 to 900
              foreground: '#FFFFFF',
              DEFAULT: '#006FEE',
            },
          },
          // ... rest of the colors
        },
      },
    }),
  ],
}
export default config
