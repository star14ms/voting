/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['voting-korea.s3.ap-northeast-2.amazonaws.com'],
  },
}

export default nextConfig 