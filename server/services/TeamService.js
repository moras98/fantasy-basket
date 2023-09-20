const createError = require('http-errors');
const Team = require('../models/team');
const TeamModelInstance = new Team();

module.exports = class TeamService {
    async create(data) {
        const { name, badge } = data;
        try {
            const teamData = {
                name, 
                badge
            }
            return await TeamModelInstance.create(teamData);
        } catch(err){
            throw createError(500, err);
        }
    }


    async findAll() {
        try {
            const teams = await TeamModelInstance.findAll();
            return teams;
        } catch(err) {
            throw err;
        }
    };

    async findOneById(data) {

        const { id } = data;
        
        try {
            const team = await TeamModelInstance.findOneById(id);

            if (!team) {
                throw createError(404, 'Team record not found');
            }

            return team;
        } catch(err) {
            throw(err);
        }
    };
};