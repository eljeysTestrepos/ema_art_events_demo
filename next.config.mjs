/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "iip-thumb.smk.dk",
      },
    ],
  },
};

export default nextConfig;
