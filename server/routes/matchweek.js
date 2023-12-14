const express = require('express');
const router = express.Router();
const MatchWeekService = require('../services/MatchWeekService');

const MatchWeekServiceInstance = new MatchWeekService();

module.exports = (app) => {
    app.use('/api/matchweeks', router);

    router.get('/', async (req, res, next) => {
        try {
            const response = await MatchWeekServiceInstance.findAll();
            res.status(200).send(response);
        } catch(err){
            next(err);
        }
    });

    router.get('/current', async (req, res, next) => {
        try {
            const response = await MatchWeekServiceInstance.findCurrent();
            res.status(200).send(response);
        } catch(err){
            next(err);
        }
    });

}