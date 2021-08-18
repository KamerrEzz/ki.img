const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = process.env.PORT ? process.env.PORT : 3001;

app
    .use(express.static(path.join(__dirname, 'public')))
    .use(cors())
    .use('/', require('./routes/img.routes'))
    .listen(port, () => {
        console.log("App listening on port " + port)
    })