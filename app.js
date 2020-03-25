const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const http = require('http');
const server = http.createServer(app);
const pg = require('pg');

//do not use my credentials, they will not work
const pool = new pg.Pool({
    user: 'fayad',
    host: 'localhost',
    database: 'appointment',
    password: 'dipto123',
    port: '5432'
});

app.get('/', (req, res) => {
    res.send("Getting from root");
});

app.post('/', (req, res) => {
   res.send('Posting to root');
});

server.listen(port, () => {
    console.log("Example app listening on port: " + port);
});