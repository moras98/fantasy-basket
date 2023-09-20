const createError = require('http-errors');
const GameModel = require('../models/game');
const GameModelInstance = new GameModel();

module.exports = class GameService {

    async findAll() {
        try {
            const games = await GameModelInstance.findAll();
            return games;
        } catch(err) {
            throw err;
        }
    };

    async findAllByDate(data) {
        const { date } = data;
        try {
            const games = await GameModelInstance.findAllByDate(date);
            return games;
        } catch(err) {
            throw err;
        }
    };

    async findAllByTeamId(team_id) {
        try {
            const games = await GameModelInstance.findAllByTeamId(team_id);
            return games;
        } catch(err) {
            throw err;
        }
    };

    async findOneById(data) {

        const { id } = data;
        
        try {
            const game = await GameModelInstance.findOneById(id);

            if (!game) {
                throw createError(404, 'Game record not found');
            }

            return game;
        } catch(err) {
            throw(err);
        }
    };

    async findOneByDateAndTeamId(date, team_id) {
        
        try {
            const game = await GameModelInstance.findOneByDateAndTeamId(date, team_id);

            if (!game) {
                throw createError(404, 'Game record not found');
            }

            return game;
        } catch(err) {
            throw(err);
        }
    };
};