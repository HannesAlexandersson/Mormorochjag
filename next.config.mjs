/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '**',
      },
    ],
    
  },
  experimental: {
    taint: true,
  },
  transpilePackages: ['lucide-react'],
};

export default nextConfig;