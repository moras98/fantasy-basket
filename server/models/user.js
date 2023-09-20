const db = require('../db');
const pgp = require('pg-promise')({ capSQL: true });


module.exports = class UserModel {

  async create(data) {
    try {

      // Generate SQL statement - using helper for dynamic parameter injection
      const statement = pgp.helpers.insert(data, null, 'users') + 'RETURNING *';
  
      // Execute SQL statment
      const result = await db.query(statement);

      if (result.rows?.length) {
        const teamData = {
          user_id: result.rows[0].id,
        }
        const statement2 = pgp.helpers.insert(teamData, null, 'users_teams') + 'RETURNING *';
        const result2 = await db.query(statement2)
        if (result2.rows?.length) {
          return result.rows[0];
        }
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }


  async update(data) {
    try {

      const { id, ...params } = data;

      // Generate SQL statement - using helper for dynamic parameter injection
      const condition = pgp.as.format('WHERE id = ${id} RETURNING *', { id });
      const statement = pgp.helpers.update(params, null, 'users') + condition;
  
      // Execute SQL statment
      const result = await db.query(statement);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  async findOneByEmail(email) {
    try {

      // Generate SQL statement
      const statement = `SELECT *
                         FROM users
                         WHERE email = $1`;
      const values = [email];
  
      // Execute SQL statment
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0]
      }
  
      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  async findOneByUsername(username) {
    try {

      // Generate SQL statement
      const statement = `SELECT *
                         FROM users
                         WHERE username = $1`;
      const values = [username];
  
      // Execute SQL statment
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0]
      }
  
      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  /**
   * Finds a user record by ID
   * @param  {String}      id [User ID]
   * @return {Object|null}    [User Record]
   */
  async findOneById(id) {
    try {

      // Generate SQL statement
      const statement = `SELECT *
                         FROM users
                         WHERE id = $1`;
      const values = [id];
  
      // Execute SQL statment
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0]
      }
  
      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  async findAll() {
    try {
      const statement ='SELECT id, username FROM users;'
      const values = [];
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        return result.rows;
    }

    return [];
    } catch(err) {
      throw new Error(err);
    }
  }
}

