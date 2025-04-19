/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    AWS_REGION: process.env.AWS_REGION,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
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
  experimental: {
    serverComponentsExternalPackages: ['@aws-sdk'],
  }
}

module.exports = nextConfig 