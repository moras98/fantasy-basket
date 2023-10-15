"use strict";

const { Pool } = require('pg');
require('dotenv').config()

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
