const { Pool } = require('pg');
require('dotenv').config();

const { DEVELOPMENT_URL_DB, PRODUCTION_URL_DB } = process.env;
let database = '';
if (process.env.NODE_ENV === 'production') {
  database = PRODUCTION_URL_DB;
} else {
  database = DEVELOPMENT_URL_DB;
}

const connection = new Pool({
  connectionString: database,
  ssl:
  process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }
    : false,
});

module.exports = connection;
