const Temperature = require('../models/Temperature');

exports.findAllTemperatures = async (req, res) => {
    try {
        const temperatures = await Temperature.find();
        res.json(temperatures)
    } catch (error) {
        res.status(500).json({
            message: error.message || "Something goes wrong retieving the tasks"
        })
    }
};

exports.createTemperature = async (req, res) => {
    try {
        const newTemperature = new Temperature({
            deviceName: req.body.deviceName,
            date: req.body.date,
            value: req.body.value ? req.body.value : ""
        });
        const temperatureSaved = await newTemperature.save();
        res.json(temperatureSaved)
    } catch (error) {
        res.status(500).json({
            message: error.message || "Something goes wrong creating a temperature"
        })
    }
};

exports.findOneTemperature = async (req, res) => {
    const { id } = req.params;
    try {
        const temperature = await Temperature.findById(id)
        if(!temperature) return res.status(404).json({
            message: `Temperature with id ${id} does not exists!`
        });
        res.json(temperature)
    } catch (error) {
        res.status(500).json({
            message: error.message || `Error retrieving temperature with id: ${id}`
        })
    }
};

exports.deleteTemperature = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Temperature.findByIdAndDelete(id)
        res.json({
            message: `${id} - Temperature were deleted successfully!`
        })
    } catch (error) {
        res.status(500).json({
            message: `Cannot delete temperature with id ${id}`
        })
    }
}

exports.updateTemperature = async (req, res) => {
    const {id} = req.params;
    try {
        await Temperature.findByIdAndUpdate(id, req.body)
    res.json({
        message: "Temperature was updated successfully"
    })
    } catch (error) {
        res.status(500).json({
            message: `Cannot update temperature with id: ${id}`
        })
    }
}