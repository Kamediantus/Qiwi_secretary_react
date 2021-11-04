const http = require('http')
const fs = require('fs')
const bodyParser = require('body-parser');

const filePath = 'C:\\Users\\lipri\\WebstormProjects\\qiwi_secretary\\src\\data\\test.txt';

const testUrl = '/test';
const saveUrl = '/save';



http.createServer((req, res) => {
    console.log(req.method);
    // console.log(req.method);
    // console.log(req.headers);
    // console.log(JSON.parse(req));
    res.writeHead(200, {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
    });

    if (req.url == saveUrl) {
        console.log('save request');
        res.end('test url');
    }
    if (req.method === 'POST') {
        console.log(bodyParser.text());
    }



    // res.end('Test server node yeah');
    // fs.writeFileSync(filePath, 'Privet medved', (err => {
    //     console.log('ERROR');
    // }))
    // console.log('File was updated')
}).listen(3001, () => console.log('Node js server started.'));

