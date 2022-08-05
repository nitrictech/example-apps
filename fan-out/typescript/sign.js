const jwt = require('jsonwebtoken');
const fs = require('fs');

var privateKey = fs.readFileSync('secret.key');

var token = jwt.sign({ test: 'test' }, privateKey, {expiresIn: '2 days', algorithm: 'RS256'} )

console.log(token);