/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  typescript: {
    ignoreBuilderErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
