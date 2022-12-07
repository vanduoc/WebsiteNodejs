import express from 'express';
import bodyParser from 'body-parser';
// import cors from 'cors';
import viewEngine from './config/viewEngine.js';
import initWebRoutes from './route/web.js';
import connectDB from './config/connectDB.js';

import dotenv from 'dotenv';
dotenv.config();
let app = express();

// app.use(cors({ origin: true }));

// Add header
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

// Connect DB
connectDB();

let port = process.env.PORT || 6969;

app.listen(port, () => {
    console.log('backend Nodejs is nuning on the port: ' + port);
});
