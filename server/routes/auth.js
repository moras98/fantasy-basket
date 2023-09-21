const express = require('express');
const router = express.Router();

// Instantiate Services
const AuthService = require('../services/AuthService');
const AuthServiceInstance = new AuthService();

const UserService = require('../services/UserService');
const UserServiceInstance = new UserService();

module.exports = (app, passport) => {

  app.use('/api/auth', router);

  // Registration Endpoint
  router.post('/register', async (req, res, next) => {
  
    try {
      const data = req.body;

      const response = await AuthServiceInstance.register(data);
      res.status(200).send(response);
    } catch(err) {
      next(err);
    }
  
  });
  
  // Login Endpoint
  router.post('/login', passport.authenticate('local'), async (req, res, next) => {
    try {
      const { username, password } = req.body;
    
      const response = await AuthServiceInstance.login({ email: username, password});
      res.status(200).send(response);
    } catch(err) {
      next(err);
    }
  });
  

  // Check Login Status Endpoint
  router.get('/logged_in', async (req, res, next) => {
    try {
      if (req.user !== undefined){
        const { id } = req.user; 

        const user = await UserServiceInstance.get({ id });
      
        res.status(200).send({
          loggedIn: true,
          user
        });
        }
      } catch(err) {
        next(err);
      }
  });

  router.post('/logout', (req, res, next) => {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/api');
    });
  });
}