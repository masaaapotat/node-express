const express = require('express');
const morgan = require('morgan');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));

app.use(express.json());
// routing method to catch all http verbs
app.all('/path', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    // passes control to the next function
    next();
})
app.get('/campsites', (req, res) => {
    res.end('Will send all the camps to you');

})
app.post('/campsites', (req, res) => {
    res.end(`Will add the camps: ${req.body.name} with description: ${req.body.description}`);
})

app.put('/campsites', (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /campsites');
})

app.delete('/campsites', (req, res) => {
    res.end('Deleting all campsites');
})
app.get('/campsites/:campsiteId', (req, res) => {
    res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`);
})
app.post('/campsites/:campsiteId', (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
})
app.put('/campsites/:campsiteId', (req, res) => {
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
    res.end(`Will update the campsite : ${req.body.name} with description: ${req.body.description}`)
})

app.delete('/campsites/:campsiteId', (req, res) => {
    res.end(`Deleting campsite: ${req.params.campsiteId}`);
})
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