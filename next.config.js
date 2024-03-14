require("dotenv").config();

const nextConfig = {
  dbConfig: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
};
console.log("Next.js Configuration:", nextConfig);
module.exports = nextConfig;
