/** @type {import('next').NextConfig} */
const nextConfig = {
    
    reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/login",
      },
    //   {
    //     source: "/index",
    //     destination: "/_index",
    //   },
    ];
  },

  async redirects() {
    return [
      {
        source: "/home",
        destination: "/login",
        statusCode: 301,
      },
    //   {
    //     source: "/my-index",
    //     destination: "/index",
    //     statusCode: 301,
    //   },
    ];
  },
};


export default nextConfig;
