const Pool = require("pg").Pool
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'nigora6873',
    database: 'postgres'
});

module.exports = pool