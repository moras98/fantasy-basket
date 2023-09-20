const db = require('../db');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class MatchWeekModel {
    async create (data) {
        try {
            const statement = pgp.helpers.insert(data, null, 'matchweeks') + 'RETURNING *';
            const result = await db.query(statement);

            if (result.rows?.length) {
                return resourceLimits.row[0];
            }
            return null
        } catch(err) {
            throw new Error(err);
        }
    };

    async update(data) {
        try {
            const {id, ...params} = data;
        } catch(err) {
            throw new Error(err);
        }
    }

    async findAll(){
        try {
            const statement ="SELECT * FROM matchweeks;"
            const result = await db.query(statement);

            if(result.rows?.length){
                return result.rows;
            }

            return [];
        } catch(err){
            throw new Error(err);
        }
    }

    async findCurrent(){
        try{
            const statement = "SELECT * FROM matchweeks ORDER BY id DESC LIMIT 1";
            const result = await db.query(statement);
            if (result.rows?.length) {
                return result.rows[0];
            }
            return null;
        } catch(err) {
            throw new Error(err);
        }  
    } 
}