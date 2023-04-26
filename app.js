let APPMODE = 'dev';

let https;

// Librerías
const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');

if (APPMODE === 'produccion') {
    https = require("https").createServer({
        key: fs.readFileSync('/etc/letsencrypt/live/app.sharpy.media/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/app.sharpy.media/cert.pem'),
        ca: fs.readFileSync('/etc/letsencrypt/live/app.sharpy.media/chain.pem'),
        rejectUnauthorized: false,
    },
        app
    );
    app.use(function (request, response, next) {
        if (!request.secure) {
            return response.redirect("https://" + request.headers.host + request.url);
        }
        next();
    })
}

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Server running');
});


const instagram = require('./routes/instagram');

app.post('/api/instagram', (req, res) => { instagram.generateResponse(req, res, next) });

if (APPMODE === 'dev') {
    http.createServer(app).listen(80, () => {
        console.log('Server running on dev mode, port 80');
    });
} else {
    https.listen(443, () => {
        console.log('Server running on production mode, port 443');
    });
}