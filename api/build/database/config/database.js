"use strict";
require('dotenv').config();
module.exports = {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
        timezone: 'Z',
    },
    logging: false,
};
//# sourceMappingURL=database.js.map