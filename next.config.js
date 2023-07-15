/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    //  for external Image (https://nextjs.org/docs/pages/api-reference/components/image)
    remotePatterns: [
      //   {
      //     protocol: 'https',
      //     hostname: 'example.com',
      //     port: '',
      //     pathname: '/account123/**',
      //   },
    ],
  },
};

module.exports = nextConfig;
