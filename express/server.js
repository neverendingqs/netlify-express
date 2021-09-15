'use strict';
const express = require('express');
const { exec } = require('child_process')
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda

app.use('/npm/:package', async (req, res) => {
    let _package = req.params.package;
    let result = null;
    try {
      result = await runCommand(`npm view ${_package} versions --json`);
    } catch(err) {
      result = err;
    }
    
    res.send(result);
})

app.use('/npm/:scoped/:package', async (req, res) => {
    let scoped = req.params.scoped;
    let _package = req.params.package;
    let result = null;
    try {
    result = await runCommand(`npm view ${scoped}/${_package} versions --json`);
    } catch(err) {
    result = err;
    }
      
    res.send(result);
})

app.use('/npm', async (req, res) => {
    res.send(`Add the package name in the correct format to get all package version in JSON /npm/:packageName or /npm/:scoped/:packageName`)
})

//The 404 Route (ALWAYS Keep this as the last route)
app.use('*', function(req, res){
    res.status(404).send(`Add the package name in the correct format to get all package version in JSON /npm/:packageName or /npm/:scoped/:packageName`)
});

module.exports = app;
module.exports.handler = serverless(app);

function runCommand(cmd) {
    return new Promise((resolve, reject) => {
      exec(cmd, (error, stdout, stderr) => {
        if (error) return reject(error)
        if (stderr) return reject(stderr)
        resolve(stdout)
      })
    })
  }
