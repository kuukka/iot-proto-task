const Reading = require('../models/Reading');

exports.findAllReadings = async (req, res) => {
    try {
        const readings = await Reading.find();
        res.json(readings)
    } catch (error) {
        res.status(500).json({
            message: error.message || "Something goes wrong retieving the tasks"
        })
    }
};

exports.createReading = async (req, res) => {
    try {        
        const newReading = new Reading({
            deviceName: req.body.deviceName,
            timestamp: req.body.timestamp,
            light: req.body.light,
            temperature: req.body.temperature,
            heartbeat: req.body.heartbeat,
            humidity: req.body.humidity,
            distance: req.body.distance
        });

        const readingSaved = await newReading.save();
        res.json(readingSaved)
    } catch (error) {
        res.status(500).json({
            message: error.message || "Something goes wrong creating a reading"
        })
    }
};

exports.findOneReading = async (req, res) => {
    const { id } = req.params;
    try {
        const reading = await Reading.findById(id)
        if(!reading) return res.status(404).json({
            message: `Reading with id ${id} does not exists!`
        });
        res.json(reading)
    } catch (error) {
        res.status(500).json({
            message: error.message || `Error retrieving reading with id: ${id}`
        })
    }
};

exports.deleteReading = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Reading.findByIdAndDelete(id)
        res.json({
            message: `${id} - Reading were deleted successfully!`
        })
    } catch (error) {
        res.status(500).json({
            message: `Cannot delete reading with id ${id}`
        })
    }
}

exports.updateReading = async (req, res) => {
    const {id} = req.params;
    try {
        await Reading.findByIdAndUpdate(id, req.body)
    res.json({
        message: "Reading was updated successfully"
    })
    } catch (error) {
        res.status(500).json({
            message: `Cannot update reading with id: ${id}`
        })
    }
}