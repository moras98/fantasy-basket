const createError = require('http-errors');
const UserModel = require('../models/user');
const UserModelInstance = new UserModel();
const bcrypt = require('bcrypt');

module.exports = class AuthService {

  async register(data) {

    const { email, username, password } = data;

    try {
      // Check if user already exists
      let user = await UserModelInstance.findOneByEmail(email);
      // If user already exists, reject
      if (user) {
        throw createError(409, 'Email already in use');
      }

      user = await UserModelInstance.findOneByUsername(username);
      // If user already exists, reject
      if (user) {
        throw createError(409, 'Username already in use');
      }

      // User doesn't exist, create new user record
      const hashedPassword = await bcrypt.hash(password, 10);

      const userData = {
        email,
        username,
        password: hashedPassword, // Almacena la contraseña hasheada en la base de datos
      };
      // return await UserModelInstance.create(userData);
      const newUser = await UserModelInstance.create(userData);
      
      return newUser;

    } catch(err) {
      throw createError(500, err);
    }

  };

  

  async login(data) {
    const { email, password } = data;
  
    try {
      // Check if user exists

      const user = await UserModelInstance.findOneByEmail(email);

      // If no user found, reject
      if (!user) {
        throw createError(401, 'Incorrect email');
      }
      // Compare the provided password with the hashed password

      const passwordsMatch = await bcrypt.compare(password, user.password);

      if (!passwordsMatch) {
        throw createError(401, 'Incorrect password');
      }
      return user;
  
    } catch(err) {
      throw createError(500, err);
    }
  };  
}