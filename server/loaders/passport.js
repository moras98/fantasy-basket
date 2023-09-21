const passport = require('passport');
const LocalStrategy = require('passport-local');

const AuthService = require('../services/AuthService');
const UserService = require('../services/UserService');
const AuthServiceInstance = new AuthService();

const UserServiceInstance = new UserService();

module.exports = (app) => {

    // Initialize passport
    app.use(passport.initialize());  
    app.use(passport.session());
    
    // Set method to serialize data to store in cookie
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });
    
    // Set method to deserialize data stored in cookie and attach to req.user
    passport.deserializeUser(async (id, done) => {
      try {
        const data = {id: id}
        const user = await UserServiceInstance.get(data);
        done(null, user);
      } catch(err){
        return done(err)
      }
    });
  
    // Configure strategy to be use for local login
    passport.use(new LocalStrategy(
      async (username, password, done) => {
        try {
          const user = await AuthServiceInstance.login({ email: username, password });
          return done(null, user);
        } catch(err) {
          return done(err);
        }
      }
    ));

    return passport;
  
}  