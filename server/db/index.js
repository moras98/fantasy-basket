"use strict";

const { Pool } = require('pg');
const { DB } =require('../config');
require('dotenv').config()
const { createClient } = require("@supabase/supabase-js");

// const pool = new Pool({
//   user: DB.PGUSER,
//   host: DB.PGHOST,
//   database: DB.PGDATABASE,
//   password: DB.PGPASSWORD,
//   port: DB.PGPORT, // El puerto predeterminado de PostgreSQL
// });

const supabaseHost = process.env.SUPABASE_HOST;
const supabaseDB = process.env.SUPABASE_DB;
const supabaseUser = process.env.SUPABASE_USER;
const supabasePassword = process.env.SUPABASE_PASSWORD;
const supabasePort = process.env.SUPABASE_PORT;


const pool = new Pool({
  user: supabaseUser,
  host: supabaseHost,
  database: supabaseDB,
  password: supabasePassword,
  port: supabasePort, // El puerto predeterminado de PostgreSQL
})

module.exports = pool;
