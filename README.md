# express-access-token [![npm version](https://badge.fury.io/js/express-access-token.png)](https://badge.fury.io/js/express-access-token)

Want to create Your own authentication logic?
This package is one of the bricks that You need.

It detects access token in request:
1. headers (`Authorization: Bearer {accessToken}`)
2. cookies (`req.cookies.accessToken`) - `cookie-parser` must be attached
3. query string (`req.query.accessToken`)

and makes available as `req.accessToken`


Usage:
```
const
  express = require('express'),
  app = express(),
  cookieParser = require('cookie-parser'),
  expressAccessToken = require('express-access-token');
  
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const accessTokens = [
  "6d7f3f6e-269c-4e1b-abf8-9a0add479511",
  "110546ae-627f-48d4-9cf8-fd8850e0ac7f",
  "04b90260-3cb3-4553-a1c1-ecca1f83a381"
];
const firewall = (req, res, next) => {
  const authorized = accessTokens.includes(req.accessToken);
  if(!authorized) return res.status(403).send('Forbidden');
  next();
};

// attaching to route group
app.use('/api', 
        expressAccessToken, // attaching accessToken to request
        firewall, // firewall middleware that handles uses req.accessToken
        require('./routes/api'));
        
// attaching to dedicated method, route
app.get('/restricted-route', 
        expressAccessToken, // attaching accessToken to request
        firewall, // firewall middleware that handles uses req.accessToken
        (req, res) => res.send('Welcome to restricted page'));

app.listen(8080, () => console.log('app listening'));
```
