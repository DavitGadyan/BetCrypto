/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: every screen is client-rendered demo data, so the whole
  // build ships as plain files — hostable on GitHub Pages or Vercel as-is.
  output: "export",
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
