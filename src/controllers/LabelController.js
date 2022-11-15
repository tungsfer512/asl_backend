const { Label } = require('../models/models');

// Create
const addNewLabel = async (req, res) => {
    try {
        let newLabelData = req.body;
        let newLabel = new Label({
            title: newLabelData.title,
            description: newLabelData.description,
            status: newLabelData.status
        });
        let resData = newLabel.dataValues;
        await newLabel.save();
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
const deleteLabelById = async (req, res) => {
    try {
        let label = await Label.findOne({
            where: {
                id: req.params.labelId
            },
            raw: true
        });
        await Label.destroy({
            where: {
                id: req.params.labelId
            },
            raw: true
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: label
        });
    } catch (err) {
        res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Update
const updateLabelById = async (req, res) => {
    try {
        let newLabelData = req.body;
        await Label.update(
            {
                title: newLabelData.title,
                description: newLabelData.description,
                status: newLabelData.status
            },
            {
                where: {
                    id: req.params.labelId
                },
                raw: true
            }
        );
        let resData = await Label.findOne({
            where: {
                id: req.params.labelId
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
// Read
const getAllLabel = async (req, res) => {
    try {
        let labels = await Label.findAll({
            raw: true
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: labels
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getLabelById = async (req, res) => {
    try {
        let label = await Label.findOne({
            where: {
                id: req.params.labelId
            },
            raw: true
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: label
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};

module.exports = {
    addNewLabel,
    deleteLabelById,
    updateLabelById,
    getAllLabel,
    getLabelById
};
