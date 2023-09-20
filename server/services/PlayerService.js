const createError = require('http-errors');
const PlayerModel = require('../models/player');
const PlayerModelInstance = new PlayerModel();

module.exports = class PlayerService {
    
    async getAll() {
        try {
            const list = await PlayerModelInstance.findAll();
            return list;
        } catch(err) {
            throw err;
        }
    }

    async findAllByTeamId(data) {
        const { teamId } = data;
        try {
            const team_players = await PlayerModelInstance.findAllByTeamId(data);
            return team_players;
        } catch(err) {
            throw err;
        }
    }
    
    async findOneById(data) {
        const { id } = data;
        try {
            const player = await PlayerModelInstance.findOneById(data);

            if(!player) {
                throw createError(404, 'Player record not found');
            }

            return player;
            
        } catch(err) {
            throw err;
        }
    }
};