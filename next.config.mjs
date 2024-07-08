/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/redirect",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; frame-ancestors 'self';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
