const express = require('express');

const ModelController = require('../controllers/ModelController');

let modelRouter = express.Router();

modelRouter.post('/add', ModelController.addNewLstmModel);
modelRouter.delete('/delete/:modelId', ModelController.deleteLstmModelById);
modelRouter.get('/', ModelController.getAllLstmModel);

module.exports = modelRouter;
