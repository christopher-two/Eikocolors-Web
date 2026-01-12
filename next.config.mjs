/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Removed to support dynamic rendering on Vercel
  // Optional: Add a trailing slash to all paths `/about` -> `/about/`
  // trailingSlash: true,
  // Optional: Change the output directory `out` -> `dist`
  // distDir: 'dist',
  images: {
    unoptimized: true,
  }
};

export default nextConfig;
