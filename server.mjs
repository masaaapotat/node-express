import express from 'express';
import morgan from 'morgan';
import campsiteRouter from './routes/campsiteRouter.mjs';

import promotionRouter from './routes/promotionRouter.mjs';
import partnerRouter from './routes/partnerRouter.mjs';
// const morgan = require('morgan');
// const campsiteRouter = require('./routes/campsiteRouter');
// const promotionRouter = require('./routes/promotionRouter');
// const partnerRouter = require('./routes/partnerRouter');
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Recreate __dirname and __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const hostname = 'localhost';
const port = 3010;

const app = express();
app.use(morgan('dev'));

app.use(express.json());
// route path for the campsite data
app.use('/campsites', campsiteRouter);
app.use('/promotions', promotionRouter);
app.use('/partners', partnerRouter);

app.use(express.static(__dirname + '/public'));

// set up the server w use method, which takes up a callback function, which is a middleware function rhat takes up 3 paranmeters, req, res and next
app.use((req, res) => {
    // morgan handles the logging requsts
    // console.log(req.headers)
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an express server</h1></body></html>');
});
 // creates an http server and starts listening
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})