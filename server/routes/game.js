const express = require('express');
const router = express.Router();
const GameService = require('../services/GameService');

const GameServiceInstance = new GameService();

module.exports = (app) => {
    app.use('/api/games', router);

    router.get('/', async (req, res, next) => {
        try {
            const response = await GameServiceInstance.findAll();
            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    });

    router.get('/:date', async (req, res, next) => {
        try {
            const { date } = req.params;
            const response = await GameServiceInstance.findAllByDate(date);
            res.status(200).send(response);
        } catch(err){
            next(err)
        }
    });

    router.get('/team/:team_id', async (req, res, next) => {
        try {
            const { team_id } = req.params;
            const response = await GameServiceInstance.findAllByTeamId(team_id);
            res.status(200).send(response);
        } catch(err){
            next(err)
        }
    });

    router.get('/team/:teamId/:date', async (req, res, next) => {
        try {
            const { teamId, date } = req.params;
            const queryDate = new Date(date);
            const response = await GameServiceInstance.findOneByDateAndTeamId(queryDate.toISOString(), teamId);
            res.status(200).send(response);
        } catch(err){
            next(err)
        }
    });

};