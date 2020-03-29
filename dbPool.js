const pg = require('pg');

//do not use my credentials, they will not work
const pool = new pg.Pool({
    user: 'fayad',
    host: 'localhost',
    database: 'appointment',
    password: 'dipto123',
    port: '5432'
});

module.exports = pool;