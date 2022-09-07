const { Pool } = require('pg');
require('dotenv').config();

const { DEVELOPMENT_URL_DB, DATABASE_URL } = process.env;
let database = '';
if (process.env.NODE_ENV === 'production') {
  database = DATABASE_URL;
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
