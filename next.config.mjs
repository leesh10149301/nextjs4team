/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://www.ktwiz.co.kr/api/:path*', // 여기서 프록시로 우회
      },
    ];
  },
      images: {
    domains: ['www.ktwiz.co.kr','wizzap.ktwiz.co.kr'],
  },
};

export default nextConfig;
