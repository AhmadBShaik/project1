/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:serve*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Headers", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "*" },
          { key: "x-requested-with", value: "XMLHttpRequest" },
          {
            key: "Access-Control-Expose-Headers",
            value: "Content-Encoding,value:api_key",
          },
          { key: "origin", value: "http://localhost:3000" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
