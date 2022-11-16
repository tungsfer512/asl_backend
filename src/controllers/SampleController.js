const { Sample } = require('../models/models');
const uploadFile = require('./uploadFileMiddleware');

// Create
const addNewSample = async (req, res) => {
    try {
        await uploadFile(req, res);
        if (req.file == undefined) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Upload a file please!'
            });
        }
        let newSampleData = req.body;
        newSampleData.path = req.file.filename;
        let newSample = new Sample({
            path: newSampleData.path,
            description: newSampleData.description,
            labelId: newSampleData.labelId,
            status: 'pretrain'
        });
        let resData = newSample.dataValues;
        await newSample.save();
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
const deleteSampleById = async (req, res) => {
    try {
        let sample = await Sample.findOne({
            where: {
                id: req.params.sampleId
            },
            raw: true
        });
        await Sample.destroy({
            where: {
                id: req.params.sampleId
            },
            raw: true
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: sample
        });
    } catch (err) {
        res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Update
const updateSampleById = async (req, res) => {
    try {
        console.log(123);
        let newSampleData = req.body;
        await Sample.update(
            {
                status: newSampleData.status,
                description: newSampleData.description
            },
            {
                where: {
                    id: req.params.sampleId
                },
                raw: true
            }
        );
        let resData = await Sample.findOne({
            where: {
                id: req.params.sampleId
            },
            raw: true
        });
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
const updateAllSample = async (req, res) => {
    try {
        console.log(123);
        await Sample.update(
            {
                status: 'trained'
            },
            {
                where: {},
                raw: true
            }
        );
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK'
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Read
const getAllSample = async (req, res) => {
    try {
        let samples = await Sample.findAll({
            raw: true
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: samples
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getAllSampleByLabelId = async (req, res) => {
    try {
        let samples = await Sample.findAll({
            where: {
                labelId: req.params.labelId
            },
            raw: true
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: samples
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getSampleById = async (req, res) => {
    try {
        let sample = await Sample.findOne({
            where: {
                id: req.params.sampleId
            },
            raw: true
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: sample
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};

module.exports = {
    addNewSample,
    deleteSampleById,
    updateSampleById,
    updateAllSample,
    getAllSample,
    getSampleById,
    getAllSampleByLabelId
};
