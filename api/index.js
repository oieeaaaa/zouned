const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const routes = require('./routes');
const db = require('./db');

app.prepare().then(() => {
  const server = express();

  // middlewares
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());
  server.use((req, res, cb) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    cb();
  });
  server.use('/api', routes);

  // testing db connection
  db
    .authenticate()
    .then(() => {
      console.log('DB Connection established.') // eslint-disable-line
    })
    .catch(err => {
      console.error('Unable to connect to the database', err) // eslint-disable-line
    });

  // to render all client side pages
  server.all('*', (req, res) => handle(req, res));

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line
  });
});
