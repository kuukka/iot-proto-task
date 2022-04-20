const Luminance = require('../models/Luminance');

exports.findAllLuminances = async (req, res) => {
    try {
        const luminances = await Luminance.find();
        res.json(luminances)
    } catch (error) {
        res.status(500).json({
            message: error.message || "Something goes wrong retieving the tasks"
        })
    }
};

exports.createLuminance = async (req, res) => {
    try {
        const newLuminance = new Luminance({
            deviceName: req.body.deviceName,
            date: req.body.date,
            value: req.body.value ? req.body.value : ""
        });
        const luminanceSaved = await newLuminance.save();
        res.json(luminanceSaved)
    } catch (error) {
        res.status(500).json({
            message: error.message || "Something goes wrong creating a luminance"
        })
    }
};

exports.findOneLuminance = async (req, res) => {
    const { id } = req.params;
    try {
        const luminance = await Luminance.findById(id)
        if(!luminance) return res.status(404).json({
            message: `Luminance with id ${id} does not exists!`
        });
        res.json(luminance)
    } catch (error) {
        res.status(500).json({
            message: error.message || `Error retrieving luminance with id: ${id}`
        })
    }
};

exports.deleteLuminance = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Luminance.findByIdAndDelete(id)
        res.json({
            message: `${id} - Luminance were deleted successfully!`
        })
    } catch (error) {
        res.status(500).json({
            message: `Cannot delete luminance with id ${id}`
        })
    }
}

exports.updateLuminance = async (req, res) => {
    const {id} = req.params;
    try {
        await Luminance.findByIdAndUpdate(id, req.body)
    res.json({
        message: "Luminance was updated successfully"
    })
    } catch (error) {
        res.status(500).json({
            message: `Cannot update luminance with id: ${id}`
        })
    }
}