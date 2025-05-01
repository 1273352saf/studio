import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
       {
         protocol: 'https',
         hostname: 'upload.wikimedia.org', // Add Wikimedia
         port: '',
         pathname: '/**',
       },
       {
         protocol: 'https',
         hostname: 'encrypted-tbn0.gstatic.com', // Add Google Images domain
         port: '',
         pathname: '/**',
       },
    ],
  },
};

export default nextConfig;
