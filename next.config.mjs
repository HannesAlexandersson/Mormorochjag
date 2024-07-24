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
    /* domains: ['cdn.sanity.io'], */ // Add any other domains if needed
  },
};

export default nextConfig;