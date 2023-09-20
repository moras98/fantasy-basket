const createError = require('http-errors');
const UserTeamModel = require('../models/user_team');
const { use } = require('passport');
const UserTeamInstance = new UserTeamModel();

module.exports = class UserTeamService {
    
    async findAll() {
        try {
            const users_teams = await UserTeamInstance.findAll();
            return users_teams;
        }catch(err) {
            throw err;
        }
    };
    
    async findOneById(data) {
        const { id } = data;
        try {
            const game_stats = await UserTeamInstance.findOneById(id);
            if (!game_stats) {
                throw createError(404, 'User Team record not found');
            }

            return game_stats;
        } catch(err){
            throw err;
        }
    };
    async findOneByUserId(data) {
        const { id } = data;
        try {
            const game_stats = await UserTeamInstance.findOneById(data);
            if (!game_stats) {
                throw createError(404, 'User Team record not found');
            }

            return game_stats;
        } catch(err){
            throw err;
        }
    };

    async create(data) {
        const { user_id } = data;

        try {
            const teamData = {
                user_id,
                money: 1000,
                points: 0
            }

            const newTeam = await UserTeamService.create(teamData);
            return newTeam;
        } catch(err){
            throw err;
        }
    }

    async update(data) {

        try {
          // Check if user already exists
          const user_team = await UserTeamInstance.update(data);
    
          return user_team;
    
        } catch(err) {
          throw err;
        }
    
    };

    async updateOnColumn(data){
        const {user_id, columnName, player_id} = data;
        try {
            const user_team = await UserTeamInstance.updateOnColumn(data);
            return user_team;
        } catch(err){
            throw(err);
        }
    }

    async sellPlayer(data){
        // const { user_id, columnName, playerId, value } = data;
        try {
            const user_team = await UserTeamInstance.sellPlayer(data);
            return user_team;
        } catch(err){
            throw(err);
        }
    }

    async buyPlayer(data){
        // const { user_id, columnName, playerId, value } = data;
        try {
            const user_team = await UserTeamInstance.buyPlayer(data);
            return user_team;
        } catch(err){
            throw(err);
        }
    }
};