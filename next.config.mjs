/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/static-webpage",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
