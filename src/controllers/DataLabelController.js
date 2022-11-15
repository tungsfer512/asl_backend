const { DataLabel } = require('../models/models');

// Create
const addNewDataLabel = async (req, res) => {
    try {
        let newDataLabelData = req.body;
        let newDataLabel = new DataLabel({
            dataId: newDataLabelData.dataId,
            labelId: newDataLabelData.labelId
        });
        let resData = newDataLabel.dataValues;
        await newDataLabel.save();
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
const getAllDataLabelByDataId = async (req, res) => {
    try {
        let labels = await DataLabel.findAll({
            where: {
                dataId: req.params.dataId
            },
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
module.exports = {
    addNewDataLabel,
    getAllDataLabelByDataId
};
