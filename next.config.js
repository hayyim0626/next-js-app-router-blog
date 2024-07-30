/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.NEXT_PUBLIC_S3_DOMAIN],
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_S3_DOMAIN,
        pathname: "*.png"
      },
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_S3_DOMAIN,
        pathname: "*.jpeg"
      }
    ]
  },
  // for svg image
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"]
    });
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/coin-calculator",
        destination: "/coinCalculator"
      }
    ];
  }
};

module.exports = nextConfig;
