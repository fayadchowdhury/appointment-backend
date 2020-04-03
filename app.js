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

app.use('/doctor/self', require('./routes/doctor/profile')); //done
app.use('/doctor/find', require('./routes/doctor/find')); //done
app.use('/doctor/ratings', require('./routes/ratings/doctor')); //done
app.use('/doctor/times', require('./routes/time/times')); //done
app.use('/doctor/appointments', require('./routes/appointments/doctor'));

app.use('/patient/profile', require('./routes/patient/profile')); //done
app.use('/patient/appointments', require('./routes/appointments/patient'));

server.listen(port, () => {
    console.log("Example app listening on port: " + port);
});