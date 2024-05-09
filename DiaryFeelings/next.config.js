/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.pinimg.com', 'i.imgur.com'],
  },
  pageExtensions: ['js', 'jsx', 'tsx', 'ts'],

  // cz-shortcut-listen -> 이오류가 뜨는데 확장크롬을 모두 끄거나 밑에 설정값으로 경고 무시
  // 경고 무시 설정
  experimental: {
    reactRoot: true,
  },
  typescript: {
    ignoreBuildErrors: true,
 },

  head: {
    meta: {
      charset: 'UTF-8',
    },
  },
}
module.exports = nextConfig
