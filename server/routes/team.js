const express = require('express');
const router = express.Router();
const TeamService = require('../services/TeamService');

const TeamServiceInstance = new TeamService();

module.exports = (app) => {
    app.use('/api/teams', router);

    router.get('/', async (req, res, next) =>{
        try {
            const response = await TeamServiceInstance.findAll();
            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    });

    router.get('/:teamId', async (req, res, next) => {
        try {
           const { teamId } = req.params;
           const response = await TeamServiceInstance.findOneById({id: teamId});
           res.status(200).send(response); 
        } catch(err){
            next(err);
        }
    })

    // router.post('/add', async (req, res, next) => {
    //     try {
    //         const data = req.body;

    //         const response = await TeamServiceInstance.create(data);
    //         res.status(200).send(response);
    //     } catch(err) {
    //         next(err);
    //     }
    // });
};