// set dependencies
const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const bodyParser = require('body-parser');
const jwtAuthz = require('express-jwt-authz');

// enable the use of request body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Create middleware for checking the JWT
const checkJwt = jwt({
    // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://localhost:3001/.well-known/jwks.json`
    }),

    // Validate the audience and the issuer.
    audience: process.env.AUTH0_AUDIENCE,
    issuer: `https://localhost:3001/save`,
    algorithms: ['RS256']
});

// create timesheets API endpoint
app.post('/save',  checkJwt, jwtAuthz(['batch:upload']), function(req, res){
    var timesheet = req.body;

    console.log(req);
    // Save the timesheet entry to the database...

    //send the response
    res.status(201).send(timesheet);
})

// launch the API Server at localhost:8080
app.listen(3001);