const Heartbeat = require('../models/Heartbeat');

exports.findAllHeartbeats = async (req, res) => {
    try {
        const heartbeats = await Heartbeat.find();
        res.json(heartbeats)
    } catch (error) {
        res.status(500).json({
            message: error.message || "Something goes wrong retieving the tasks"
        })
    }
};

exports.createHeartbeat = async (req, res) => {
    try {
        const newHeartbeat = new Heartbeat({
            deviceName: req.body.deviceName,
            date: req.body.date,
            value: req.body.value ? req.body.value : ""
        });
        const heartbeatSaved = await newHeartbeat.save();
        res.json(heartbeatSaved)
    } catch (error) {
        res.status(500).json({
            message: error.message || "Something goes wrong creating a heartbeat"
        })
    }
};

exports.findOneHeartbeat = async (req, res) => {
    const { id } = req.params;
    try {
        const heartbeat = await Heartbeat.findById(id)
        if(!heartbeat) return res.status(404).json({
            message: `Heartbeat with id ${id} does not exists!`
        });
        res.json(heartbeat)
    } catch (error) {
        res.status(500).json({
            message: error.message || `Error retrieving heartbeat with id: ${id}`
        })
    }
};

exports.deleteHeartbeat = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Heartbeat.findByIdAndDelete(id)
        res.json({
            message: `${id} - Heartbeat were deleted successfully!`
        })
    } catch (error) {
        res.status(500).json({
            message: `Cannot delete heartbeat with id ${id}`
        })
    }
}

exports.updateHeartbeat = async (req, res) => {
    const {id} = req.params;
    try {
        await Heartbeat.findByIdAndUpdate(id, req.body)
    res.json({
        message: "Heartbeat was updated successfully"
    })
    } catch (error) {
        res.status(500).json({
            message: `Cannot update heartbeat with id: ${id}`
        })
    }
}