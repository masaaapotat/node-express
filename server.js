const express = require('express');
const morgan = require('morgan');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));

// set up the middleware function
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