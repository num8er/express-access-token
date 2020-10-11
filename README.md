# express-access-token [![npm version](https://badge.fury.io/js/express-access-token.png)](https://badge.fury.io/js/express-access-token)

Want to create Your own authorization logic?
This package is one of the bricks that You need.

It extracts string values that can be used as access token from:
1. headers (`Authorization: Bearer {accessToken}`, `Authorization: {accessToken}`)
2. cookies (`req.cookies.accessToken`) - `cookie-parser` must be attached
3. query string (`req.query.accessToken`)

and makes available as `req.accessToken`

!!! don't use this middleware for `Authorization: Basic username:password` scheme, since it's not access token based authorization logic, read: [RFC7617](https://tools.ietf.org/html/rfc7617)

----

Example:
```
const express = require('express');
const cookieParser = require('cookie-parser');
const expressAccessToken = require('express-access-token');

const app = express();
app.use(cookieParser());


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
  (req, res) => res.status(200).send({message: 'api route'}));


// attaching to dedicated method, route
app.get('/restricted-route',
  expressAccessToken, // attaching accessToken to request
  firewall, // firewall middleware that handles uses req.accessToken
  (req, res) => res.send('Welcome to restricted page'));


const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`app listening at: ${PORT}`));
```
