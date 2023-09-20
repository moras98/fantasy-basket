const express = require('express');
const UserTeamService = require('../services/UserTeamService');
const router = express.Router();

const UserTeamServiceInstance = new UserTeamService();

module.exports = (app, passport) => {
    app.use('/api/myTeam', router);

    router.post('/create', async (req, res ,next)=> {
        try {
            const data = req.body;
            const response = await UserTeamServiceInstance.create(data);
            console.log(response);
            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    });

    router.get('/mine', async (req, res, next) => {
        try {
            const { id } = req.user;
            const response = await UserTeamServiceInstance.findOneByUserId(id);
            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    });

    router.post('/mine/players/:columnName/:playerId', async (req, res, next) => {
        try {
            const  { id }  = req.user;
            const {columnName, playerId} = req.params;
            const data = {
                user_id: id,
                columnName,
                playerId
            }
            const response = await UserTeamServiceInstance.updateOnColumn(data);
            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    });

    router.get('/all', async (req, res, next) => {
        try {
            const response = await UserTeamServiceInstance.findAll();
            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    });

    router.get('/:id', async (req, res, next) => {
        try {
            const { id } = req.params;
            const response = await UserTeamServiceInstance.findOneById({ id });
            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    });

    router.post('/sellPlayer', async (req, res, next) => {
        try {
            const { columnName, playerId, value } = req.body;
            const { id } = req.user;
            const data = {
                user_id: id,
                columnName,
                playerId,
                value
            }

            const response = await UserTeamServiceInstance.sellPlayer( data );
            res.status(200).send(response);
        } catch(err){
            next(err);
        }
    });

    router.post('/buyPlayer', async (req, res, next) => {
        try {
            const { columnName, playerId, value } = req.body;
            const { id } = req.user;
            const data = {
                user_id: id,
                columnName,
                playerId,
                value
            }

            const response = await UserTeamServiceInstance.buyPlayer( data );
            res.status(200).send(response);
        } catch(err){
            next(err);
        }
    });
};