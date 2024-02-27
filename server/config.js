const config = {
  PORT: process.env.PORT || 8000,
  DATABASE: {
    URL: process.env.DATABASE_URL,
    USER: process.env.DATABASE_USER,
    PASSWORD: process.env.DATABASE_PASSWORD,
  },
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};

const getConfig = () => config;
module.exports.config = getConfig();
