const db = require('../db');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class GameStatsModel {
    async create(data){
        try {
            const statement = pgp.helpers.insert(data, null, 'games_stats') + 'RETURNING *';
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
            const statement = pgp.helpers.update(params, null, 'games_stats') + condition;

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

    async findOneById(id){
        try {
            const statement = "SELECT * FROM games_stats WHERE id = $1;"
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

    async findOneByGameIdAndPlayerId(game_id, player_id){
        try {
            const statement = "SELECT * FROM games_stats WHERE game_id = $1 AND player_id = $2;"
            const values = [game_id, player_id];
            console.log(statement, values);
            const result = await db.query(statement, values);

            if (result.rows?.length){
                return result.rows[0];
            }

            return null;
        } catch(err){
            throw new Error(err);
        }
    };

    async findAllByPlayerId(player_id){
        try {
            const statement = "SELECT * FROM games_stats WHERE player_id = $1;"
            const values = [player_id];

            const result = await db.query(statement, values);

            if (result.rows?.length){
                return result.rows;
            }

            return [];
        } catch(err){
            throw new Error(err);
        }
    };
    async findAllByGameId(game_id){
        try {
            const statement = "SELECT * FROM games_stats WHERE game_id = $1;"
            const values = [game_id];

            const result = await db.query(statement, values);

            if (result.rows?.length){
                return result.rows;
            }

            return [];
        } catch(err){
            throw new Error(err);
        }
    };
};