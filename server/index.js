// const express = require('express');
// const app = express();

// const loaders = require('./loaders');

// const { PORT } = require('./config');
// const path = require('path');

// async function startServer() {
//   // Init application loaders
//   loaders(app);

//   app.use(express.static(path.resolve(__dirname, './client/build/')));
  
//   // Start server
//   app.listen(PORT, () => {
//     console.log(`Server listening on PORT ${PORT}`);
//   })
// }

// startServer();

//all loaders in one file
const express = require('express');
const app = express();

const expressLoader = require('./loaders/express');
const passportLoader = require('./loaders/passport');
const routeLoader = require('./routes');
const swaggerLoader = require('./loaders/swagger');

const { PORT } = require('./config');
const path = require('path');

async function startServer() {
  
  // Load Express middlewares
  const expressApp = await expressLoader(app);
  // Load Passport middleware
  const passport = await passportLoader(expressApp);

  // Load API route handlers
  await routeLoader(app, passport);

  // Load Swagger
  await swaggerLoader(app);

  // Error Handler
  app.use((err, req, res, next) => {

    const { message, status } = err;
  
    return res.status(status).send({ message });
  });

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
