const dotenv = require("dotenv");
const { supabaseUrl, supabaseKey } = require("./database");

dotenv.config();

module.exports = {
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseKey: process.env.SUPABASE_KEY,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiration: process.env.JWT_EXPIRATION,
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
};