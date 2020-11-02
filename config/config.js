const path = require('path');

require('dotenv').config({ 
  path: path.join(__dirname, '../.env')
});

const env = process.env;


const config = {
  port: env.APP_PORT,
  totalSlots: parseInt(env.TOTAL_SLOTS) || 5
};

module.exports = config;
