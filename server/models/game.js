const db = require('../db');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class GameModel {
    async create(data){
        try {
            const statement = pgp.helpers.insert(data, null, 'games') + 'RETURNING *';
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
            const statement = pgp.helpers.update(params, null, 'games') + condition;

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

    //find functions
    async findAll(){
        try {
            const statement = "SELECT * FROM games;"
            const values = [];
            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result.rows;
            }

            return [];
        } catch(err) {
            throw new Error(err)
        }
    };
    async findAllByTeamId(id){
        try {
            const statement = "SELECT * FROM games WHERE team1_id = $1 OR team2_id = $1";
            const values = [id];
            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result.rows;
            }

            return [];
        } catch(err) {
            throw new Error(err)
        }
    };
    async findAllByDate(date){
        try {
            const statement = "SELECT * FROM games WHERE date = $1";
            const values = [date];

            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result.rows[0];
            }

            return null;
        } catch(err) {
            throw new Error(err)
        }
    };
    async findOneById(id){
        try {
            const statement = "SELECT * FROM games WHERE id = $1";
            const values = [id];

            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result.rows[0];
            }

            return null;
        } catch(err) {
            throw new Error(err)
        }
    };
    async findOneByDateAndTeamId(date, team_id){
        try {
            const statement = "SELECT * FROM games WHERE date = $1 AND (team1_id = $2 OR team2_id = $2)";
            const values = [date, team_id];
            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result.rows[0];
            }

            return null;
            
        } catch(err) {
            throw new Error(err)
        }
    };
};