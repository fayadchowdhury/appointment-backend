const pg = require('pg');

//do not use my credentials, they will not work
const pool = new pg.Pool({
    user: 'oyeqpmpkqlmfet',
    host: 'ec2-54-197-48-79.compute-1.amazonaws.com',
    database: 'dbn78v7h6eab6g',
    password: 'a3816f4811b3332ae25f90ffec9bd6fb4e32983b94874a9bbc10264be6c39008',
    port: '5432',
    ssl: true
});

module.exports = pool;
