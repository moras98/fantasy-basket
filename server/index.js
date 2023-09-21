const express = require('express');
const app = express();
const path = require('path');

const loaders = require('./loaders');

const { PORT } = require('./config');

async function startServer() {

  // Init application loaders
  loaders(app);

  app.use(express.static(path.resolve(__dirname, 'client/build')));

  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
  
  // Start server
  app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
  })
}

startServer();