const express = require('express');
const app = express();

const loaders = require('./loaders');

const { PORT } = require('./config');
const path = require('path');

async function startServer() {

  // Init application loaders
  loaders(app);

  app.use(express.static(path.resolve(__dirname, './client/build/')));

  // Start server
  app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
  })
}

startServer();