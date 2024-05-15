/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode:false,
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'utfs.io',
            port: '',
            pathname: '/f/**',
          }, {
            protocol: 'https',
            hostname: 'assets.website-files.com',
          },
        ],
      },
    }


module.exports = nextConfig
