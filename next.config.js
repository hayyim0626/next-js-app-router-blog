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
  // for svg image
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = nextConfig;
