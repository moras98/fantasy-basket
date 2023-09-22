const expressLoader = require('./express');
const passportLoader = require('./passport');
const routeLoader = require('../routes');
const swaggerLoader = require('./swagger');
const path = require('path');

module.exports = async (app) => {

  // Load Express middlewares
  const expressApp = await expressLoader(app);
  // Load Passport middleware
  const passport = await passportLoader(expressApp);

  // Load API route handlers
  await routeLoader(app, passport);

  // Load Swagger
  await swaggerLoader(app);


  // app.get('*', function (req, res) {
  //   res.sendFile(path.join(__dirname + '../client/build/index.html'));
  // });
  
  // Error Handler
  app.use((err, req, res, next) => {

    const { message, status } = err;
  
    return res.status(status).send({ message });
  });
}