const { LstmModel } = require('../models/models');
const uploadFile = require('./uploadFileMiddleware');

// Create
const addNewLstmModel = async (req, res) => {
    try {
        await uploadFile(req, res);
        if (req.file == undefined) {
            console.log(123);
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Upload a file please!'
            });
        }
        let newLstmModelData = req.body;
        newLstmModelData.path = req.file.filename;
        let newLstmModel = new LstmModel({
            accuracy: newLstmModelData.accuracy,
            path: newLstmModelData.path,
            f1Score: newLstmModelData.f1Score
        });
        let resData = newLstmModel.dataValues;
        await newLstmModel.save();
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: resData
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Delete
const deleteLstmModelById = async (req, res) => {
    try {
        let model = await LstmModel.findOne({
            where: {
                id: req.params.modelId
            },
            raw: true
        });
        await LstmModel.destroy({
            where: {
                id: req.params.modelId
            },
            raw: true
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: model
        });
    } catch (err) {
        res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Read
const getAllLstmModel = async (req, res) => {
    try {
        let models = await LstmModel.findAll({
            raw: true
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: models
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};

module.exports = {
    addNewLstmModel,
    deleteLstmModelById,
    getAllLstmModel
};
