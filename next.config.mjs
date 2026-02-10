/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "frantic.in",
          },
        ],
        destination: "https://www.frantic.in/:path*",
        permanent: true, // 301 redirect
      },
    ];
  },
};

export default nextConfig;
