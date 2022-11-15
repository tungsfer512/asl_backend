const express = require('express');

const DataController = require('../controllers/DataController');

let dataRouter = express.Router();

dataRouter.post('/add', DataController.addNewData);
dataRouter.put('/update/:dataId', DataController.updateDataById);
dataRouter.get('/users/:userId', DataController.getAllDataByUserId);
dataRouter.get('/:dataId', DataController.getDataById);

module.exports = dataRouter;
