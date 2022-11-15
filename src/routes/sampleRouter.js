const express = require('express');

const SampleController = require('../controllers/SampleController');

let sampleRouter = express.Router();

sampleRouter.post('/add', SampleController.addNewSample);
sampleRouter.delete('/delete/:sampleId', SampleController.deleteSampleById);
sampleRouter.put('/update/all', SampleController.updateAllSample);
sampleRouter.put('/update/:sampleId', SampleController.updateSampleById);
sampleRouter.get('/labels/:labelId', SampleController.getAllSampleByLabelId);
sampleRouter.get('/:sampleId', SampleController.getSampleById);
sampleRouter.get('/', SampleController.getAllSample);

module.exports = sampleRouter;
