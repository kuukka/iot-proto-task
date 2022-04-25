const Device = require('../models/Device');

exports.findAllDevices = async (req, res) => {
    try {
        const devices = await Device.find();
        res.json(devices)
    } catch (error) {
        res.status(500).json({
            message: error.message || "Something goes wrong retieving the tasks"
        })
    }
};

exports.createDevice = async (req, res) => {
    try {        
        const newDevice = new Device({
            name: req.body.name,
            deviceId: req.body.deviceId,
            sensorLuminance: req.body.sensorLuminance,
            sensorTemperature: req.body.sensorTemperature,
            sensorMoisture: req.body.sensorMoisture,
            sensorHeartbeat: req.body.sensorHeartbeat,
            sensorDistance: req.body.sensorDistance
        });
        const deviceSaved = await newDevice.save();
        res.json(deviceSaved)
    } catch (error) {
        res.status(500).json({
            message: error.message || "Something goes wrong creating a device"
        })
    }
};

exports.findOneDevice = async (req, res) => {
    const { id } = req.params;
    try {
        const device = await Device.findById(id)
        if(!device) return res.status(404).json({
            message: `Device with id ${id} does not exists!`
        });
        res.json(device)
    } catch (error) {
        res.status(500).json({
            message: error.message || `Error retrieving device with id: ${id}`
        })
    }
};

exports.deleteDevice = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Device.findByIdAndDelete(id)
        res.json({
            message: `${id} - Device were deleted successfully!`
        })
    } catch (error) {
        res.status(500).json({
            message: `Cannot delete device with id ${id}`
        })
    }
}

exports.updateDevice = async (req, res) => {
    const {id} = req.params;
    try {
        await Device.findByIdAndUpdate(id, req.body)
    res.json({
        message: "Device was updated successfully"
    })
    } catch (error) {
        res.status(500).json({
            message: `Cannot update device with id: ${id}`
        })
    }
}