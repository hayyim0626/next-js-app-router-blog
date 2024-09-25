/** @type {import('next').NextConfig} */
const nextConfig = (phase, { defaultConfig }) => {
  const env = process.env.NODE_ENV;
  const s3Domain = process.env.NEXT_PUBLIC_S3_DOMAIN || "";
  const hostname = new URL(s3Domain).hostname;

  return {
    images: {
      domains: [hostname],
      remotePatterns: [
        {
          protocol: "https",
          hostname: hostname,
          pathname: "/images/**"
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
};

module.exports = nextConfig;
