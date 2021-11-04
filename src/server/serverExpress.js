const express = require('express')
const app = express()
app.listen(3001)

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.post('/save', (req, res) => {
    res.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': ['OPTIONS', 'GET', 'POST'],
        // 'OPTIONS, GET, POST',
    'Access-Control-Allow-Headers':
        ['Content-Type',
            'Depth',
            'User-Agent',
            'X-File-Size',
            'X-Requested-With',
            'If-Modified-Since',
            'X-File-Name',
            'Cache-Control']
    // 'Access-Control-Allow-Headers': 'Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control'
        //
        // 'Access-Control-Allow-Origin': 'http://localhost:3000',
        // 'Access-Control-Allow-Headers': '*'
    });

    console.log('save request');
    console.log(req.body)
})