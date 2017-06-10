const
  express = require('express'),
  app = express(),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  expressAccessToken = require('express-access-token'),
  firewall = require('./middlewares/firewall');
  
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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
