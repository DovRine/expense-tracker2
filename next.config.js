/** @type {import('next').NextConfig} */

// TODO: make the corsHeaders more route specific
const corsHeaders = [
  { key: "Access-Control-Allow-Origin", value: "*" },
  { key: "Access-Control-Allow-Methods", value: "OPTIONS,PATCH,GET,DELETE,POST,PUT" }
];

const nextConfig = {
  experimental: {
    appDir: true,
  },
  output: 'standalone',
  async headers() {
    return [
      {
        source: '/api/expense',
        headers: corsHeaders
      },
      {
        source: '/api/expense/:id',
        headers: corsHeaders
      },
      {
        source: '/api/category',
        headers: corsHeaders
      },
      {
        source: '/api/category/:id',
        headers: corsHeaders
      },
    ]
  }
};

module.exports = nextConfig;
