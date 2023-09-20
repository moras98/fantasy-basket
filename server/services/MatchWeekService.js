const createError = require('http-errors');
const MatchWeekModel = require('../models/matchweek');
const MatchWeekModelInstance = new MatchWeekModel();

module.exports = class MatchWeekService {
    async findAll() {
        try {
            const matchweeks = await MatchWeekModelInstance.findAll();
            return matchweeks;
        } catch (err) {
            throw err;
        }
    }

    async findCurrent() {
        try {
            const matchweek = await MatchWeekModelInstance.findCurrent();
            return matchweek;
        } catch(err) {
            throw err;
        }
    }
}