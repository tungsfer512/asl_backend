const express = require('express');

const DataLabelController = require('../controllers/DataLabelController');

let dataLabelRouter = express.Router();

dataLabelRouter.post('/add', DataLabelController.addNewDataLabel);
dataLabelRouter.get('/:dataId', DataLabelController.getAllDataLabelByDataId);

module.exports = dataLabelRouter;
