const { Pool } = require('pg');
require('dotenv').config();

const { DEVELOPMENT_URL_DB } = process.env;

const connection = new Pool({
  connectionString: DEVELOPMENT_URL_DB,
});

module.exports = connection;
