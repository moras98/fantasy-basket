const express = require('express');
const GameStatsService = require('../services/GameStatsService');
const router = express.Router();

const GameStatsServiceInstance = new GameStatsService();

module.exports = (app) => {
    app.use('/api', router);

    router.get('/games/:game_id/stats', async (req, res, next) => {
        try {
            const { game_id } = req.params;
            const response = await GameStatsServiceInstance.findAllByGameId(game_id);
            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    });

    router.get('/players/:playerId/stats', async (req, res, next) => {
        try {
            const { playerId } = req.params;
            const response = await GameStatsServiceInstance.findAllByPlayerId(playerId);
            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    });

    router.get('/players/:playerId/games/:gameId/stats', async (req, res, next) => {
        try {
            const { playerId, gameId } = req.params;
            const response = await GameStatsServiceInstance.findOneByGameIdAndPlayerId({gameId, playerId});
            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    });
};