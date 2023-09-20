const createError = require('http-errors');
const GameStatsModel = require('../models/game_stats');
const GameStatsInstance = new GameStatsModel;

module.exports = class GameStatsService {
    async findOneById(data) {
        const { id } = data;
        try {
            const game_stats = await GameStatsInstance.findOneById(id);
            if (!game_stats) {
                throw createError(404, 'Game Stats record not found');
            }

            return game_stats;
        } catch(err){
            throw err;
        }
    };
    async findOneByGameIdAndPlayerId(data) {
        const { gameId, playerId } = data;
        try {
            const game_stats = await GameStatsInstance.findOneByGameIdAndPlayerId(gameId, playerId);
            if (!game_stats) {
                throw createError(404, 'Game Stats record not found');
            }

            return game_stats;
        } catch(err){
            throw err;
        }
    };
    async findAllByPlayerId(player_id) {
        // const { player_id } = data;
        try {
            const game_stats = await GameStatsInstance.findAllByPlayerId(player_id);

            return game_stats;
        } catch(err){
            throw err;
        }
    };
    async findAllByGameId(game_id) {
        // const { game_id } = data;
        try {
            const game_stats = await GameStatsInstance.findAllByGameId(game_id);

            return game_stats;
        } catch(err){
            throw err;
        }
    };
};