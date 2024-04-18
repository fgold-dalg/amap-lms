const pgp = require('pg-promise')();
const config = require("../config");

const db = pgp({
    host: config.database.host,
    database: config.database.db,
    user: config.database.user,
    password: config.database.pwd,
    port: config.database.port,
});

module.exports = db;