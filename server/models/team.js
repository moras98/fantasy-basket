const db = require('../db');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class Team {
    
    async create(data){
        try {
            const statement = pgp.helpers.insert(data, null, 'teams') + ' RETURNING *';
            const result = await db.query(statement);

            if (result.rows?.length) {
                return result.rows[0]
            }

            return null;
        } catch(err) {
            throw new Error(err);
        }
        
    };
    async update(data){
        try {
            const  { id, ...params}  = data;

            //generar sql
            const condition = pgp.as.format('WHERE id = {$id} RETURNING *', {id});
            const statement = pgp.helpers.update(params, null, 'teams') + condition;

            //ejecutar statement
            const result = await db.query(statement);

            if (result.rows?.length) {
                return result.rows[0];
            }

            return null;

        } catch(err) {
            throw new Error(err)
        }
    };

    async findAll(){
        try {
            const statement = "SELECT * FROM teams;"
            const values = [];
            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result.rows;
            }

            return [];

        } catch(err){
            throw new Error(err);
        }
    };

    async findOneById(id){
        try {
            const statement = `SELECT * FROM teams WHERE id = $1 ORDER BY name DESC`;
            const values = [id];

            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result.rows[0]
            }
          
            return null;

        } catch (err) {
            throw new Error(err);
        }
    };
};


