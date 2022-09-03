require('dotenv').config();

const { PORT, DATABASE_URL, NODE_ENV } = process.env;

module.exports = {
  nodeEnv: NODE_ENV || 'development',
  port: PORT || 4000,
  database: {
    url: DATABASE_URL,
  },
};
