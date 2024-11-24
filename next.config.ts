import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Apenas o hostname
        pathname: '/**' // Permite todas as paths
            }
    ]
  },
};

export default nextConfig;
