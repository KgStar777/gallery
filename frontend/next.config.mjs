/** @type {import('next').NextConfig} */

// import i18n from "./next-i18next.config.js";

// const { i18n } = require("./next-i18next.config");

const nextConfig = {
  async headers() {
    return [
      {
        source: '/about',
        headers: [
          {
            key: 'x-custom-header',
            value: 'my custom header value',
          },
          {
            key: 'x-another-custom-header',
            value: 'my other custom header value',
          },
        ],
      },
    ]
  },
  // i18n,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      // {
      //   protocol: 'http',
      //   hostname: 'localhost:1337',
      //   // port: '',
      //   pathname: '/account123/**/**',
      // },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
