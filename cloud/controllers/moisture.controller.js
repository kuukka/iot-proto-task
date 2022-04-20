const Moisture = require('../models/Moisture');

exports.findAllMoistures = async (req, res) => {
    try {
        const moistures = await Moisture.find();
        res.json(moistures)
    } catch (error) {
        res.status(500).json({
            message: error.message || "Something goes wrong retieving the tasks"
        })
    }
};

exports.createMoisture = async (req, res) => {
    try {
        const newMoisture = new Moisture({
            deviceName: req.body.deviceName,
            date: req.body.date,
            value: req.body.value ? req.body.value : ""
        });
        const moistureSaved = await newMoisture.save();
        res.json(moistureSaved)
    } catch (error) {
        res.status(500).json({
            message: error.message || "Something goes wrong creating a moisture"
        })
    }
};

exports.findOneMoisture = async (req, res) => {
    const { id } = req.params;
    try {
        const moisture = await Moisture.findById(id)
        if(!moisture) return res.status(404).json({
            message: `Moisture with id ${id} does not exists!`
        });
        res.json(moisture)
    } catch (error) {
        res.status(500).json({
            message: error.message || `Error retrieving moisture with id: ${id}`
        })
    }
};

exports.deleteMoisture = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Moisture.findByIdAndDelete(id)
        res.json({
            message: `${id} - Moisture were deleted successfully!`
        })
    } catch (error) {
        res.status(500).json({
            message: `Cannot delete moisture with id ${id}`
        })
    }
}

exports.updateMoisture = async (req, res) => {
    const {id} = req.params;
    try {
        await Moisture.findByIdAndUpdate(id, req.body)
    res.json({
        message: "Moisture was updated successfully"
    })
    } catch (error) {
        res.status(500).json({
            message: `Cannot update moisture with id: ${id}`
        })
    }
}