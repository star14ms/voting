/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    AWS_REGION: process.env.AWS_REGION,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'voting-korea.s3.ap-northeast-2.amazonaws.com',
        pathname: '/images/**',
      }
    ],
  },
}

export default nextConfig 