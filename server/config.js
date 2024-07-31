require('dotenv').config();

module.exports = {
  TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN,
  PORT: process.env.PORT || 3000,
  SECRET_KEY: process.env.SECRET_KEY,
};
