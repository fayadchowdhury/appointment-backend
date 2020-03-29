const express = require('express');
const app = express();
const port = process.env.PORT || 6996;
const http = require('http');
const server = http.createServer(app);
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Getting from root");
});

app.post('/', (req, res) => {
   res.send('Posting to root');
});

app.use('/doctors', require('./routes/doctors'));

server.listen(port, () => {
    console.log("Example app listening on port: " + port);
});