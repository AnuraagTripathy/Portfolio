/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // WebP first: strong AVIF compression at default quality can look soft on JPEG portraits.
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2048, 3840],
  },
};

export default nextConfig;
