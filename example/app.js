const express = require('express');
const cookieParser = require('cookie-parser');
const expressAccessToken = require('express-access-token');
const firewall = require('./middlewares/firewall');

const app = express();
app.use(cookieParser());

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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`app listening at: ${PORT}`));
