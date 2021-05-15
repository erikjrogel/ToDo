const {Pool} = require('pg');

const PG_URL = "postgres://hzwrnzet:YQy9JiHS71rysdF1EEJLYIKhd4scStkl@queenie.db.elephantsql.com:5432/hzwrnzet"

const pool = new Pool({
    connectionString: PG_URL
}) ;

module.exports = {
  query: (text, params, callback) => {
  return pool.query(text, params, callback)
}}


