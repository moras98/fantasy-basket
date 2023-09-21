const express = require('express');
const app = express();

const loaders = require('./loaders');

const { PORT } = require('./config');
const path = require('path');
const routes = require('./routes');
const passport = require('passport');
async function startServer() {

  // Init application loaders
  loaders(app);

  routes(app, passport)

  app.use(express.static(path.resolve(__dirname, './client/build/')));

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });

  // Start server
  app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
  })
}

startServer();