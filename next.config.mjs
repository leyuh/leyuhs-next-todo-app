/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MONGO_URI: "mongodb+srv://claire_dev:xyz749bOq@cluster0.yizci.mongodb.net/",
        NEXTAUTH_SECRET: "jId4jAiR6",
        NEXTAUTH_URL: "http://localhost:3000",
        JWT_SIGNING_PRIVATE_KEY: "hSiYhDa",
        PEXELS_KEY: "NTlAlIPGA8tUlL9740KKssNYdvXSdwQxmPsyHLnHBAvaxOT9kP8cyQik"
    },
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "images.pexels.com*",
          },
          {
            protocol: "https",
            hostname: "www.pexels.com*",
          },
        ],
      },
};

export default nextConfig;
