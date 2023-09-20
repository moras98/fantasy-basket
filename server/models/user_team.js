const db = require('../db');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class UserTeamModel {
    async create(data){
        try {
            const statement = pgp.helpers.insert(data, null, 'users_teams') + 'RETURNING *';
            const result = await db.query(statement);

            if (result.rows?.length) {
                return resourceLimits.row[0]
            }

            return null
        } catch(err) {
            throw new Error(err)
        }
    };
    async update(data){
        try {
            const  { id, ...params}  = data;

            //generar sql
            const condition = pgp.as.format('WHERE id = {$id} RETURNING *', {id});
            const statement = pgp.helpers.update(params, null, 'users_teams') + condition;

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

    async sellPlayer(data){
        try{
            const {user_id, columnName, playerId, value} = data;
            const statement = `
            UPDATE users_teams SET money = (money + ${value}), ${columnName}=NULL WHERE user_id = ${user_id} RETURNING *;
            `;
            const result = await db.query(statement);
            
            if (result.rows?.length > 0) {
                const myRow = result.rows[0];
                return myRow;
            }
           
        } catch(err){
            throw new Error(err);
        }
    }

    async buyPlayer(data){
        try{
            const {user_id, columnName, playerId, value} = data;
            const statement = `
            UPDATE users_teams SET money = (money - ${value}), ${columnName} = ${playerId} WHERE user_id = ${user_id} RETURNING *;
            `;
            const result = await db.query(statement);
            
            if (result.rows?.length > 0) {
                const myRow = result.rows[0];
                return myRow;
            }
           
        } catch(err){
            throw new Error(err);
        }
    }

    async updateOnColumn(data) {
        try {
            const { user_id, columnName, playerId } = data;
            const condition = pgp.as.format(`WHERE user_id = ${user_id} RETURNING *`);

            const updateColumns = {};
            updateColumns[columnName] = playerId;

            const statement = pgp.helpers.update(updateColumns, null, 'users_teams') + condition;
            const result = await db.query(statement);
            if (result.rows?.length) {
                return result.rows[0];
            }

            return null;
        } catch(err){
            throw new Error(err);
        }
    };

    async findAll(){
        try {
            const statement = "SELECT * FROM users_teams;"
            const values = [];
            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result.rows;
            }

            return [];
        } catch(err) {
            throw new Error(err)
        }
    }

    async findOneById(id){
        try {
            const statement = "SELECT * FROM users_teams WHERE id = $1;"
            const values = [id];

            const result = await db.query(statement, values);

            if (result.rows?.length){
                return result.rows[0];
            }

            return null;
        } catch(err){
            throw new Error(err);
        }
    };

    async findOneByUserId(id){
        try {
            const statement = "SELECT * FROM users_teams WHERE user_id = $1;"
            const values = [id];

            const result = await db.query(statement, values);

            if (result.rows?.length){
                return result.rows[0];
            }

            return null;
        } catch(err){
            throw new Error(err);
        }
    };
};