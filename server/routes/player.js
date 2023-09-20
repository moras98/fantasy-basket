const express = require('express');
const router = express.Router();
const PlayerService = require('../services/PlayerService');

const PlayerServiceInstance = new PlayerService();

module.exports = (app) => {
    app.use('/api', router);

    router.get('/players', async (req, res, next) => {
        try {
            const response = await PlayerServiceInstance.getAll();
            res.status(200).send(response);
        } catch(err){
            next(err);
        }
    });

    router.get('/teams/:teamId/players', async (req, res, next) => {
        try {
            const {teamId} = req.params;
            const response = await PlayerServiceInstance.findAllByTeamId(teamId);
            res.status(200).send(response);
        } catch(err){
            next(err);
        }
    });

    router.get('players/:playerId', async (req, res, next) => {
        try {
            const {playerId} = req.params;
            const response = await PlayerServiceInstance.findOneById(playerId);
            res.status(200).send(response);
        } catch(err){
            next(err);
        }
    });
};