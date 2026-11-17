/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"], minimumCacheTTL: 86400 },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/icons/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=2592000",
          },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/",
        headers: [
          {
            key: "Vercel-CDN-Cache-Control",
            value: "max-age=3600, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/projects/:slug",
        headers: [
          {
            key: "Vercel-CDN-Cache-Control",
            value: "max-age=3600, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};
export default nextConfig;
