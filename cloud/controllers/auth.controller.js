const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res) => {
    const { name, email, password } = req.body;
    
    try {

        const userExist = await User.findOne({ email: req.body.email });

        if (userExist){
            return res.status(400).json({
                message: 'User already exists'
            })
        } 

        const newUser = new User({
            name, email, password: await User.encryptPassword(password)
        })
    
        const savedUser = await newUser.save();
    
        const newToken = jwt.sign({ id: savedUser._id }, process.env.SECRET_KEY, {
            expiresIn: 86400 // one day
        })
        res.status(200).json({ 
            _id: savedUser._id,
            name: savedUser.name,
            message: 'Signup succesful',
            token: newToken
        })
    } catch (e) {
        res.status(200).json(["error" ])
    }    
}

exports.logIn = async (req, res) => {
    console.log(req);
    const userExist = await User.findOne({ email: req.body.email });

    if (!userExist) return res.status(400).json({
        message: 'User not exists'
    })

    const matchPassword = await User.comparePassword(req.body.password, userExist.password)

    if (!matchPassword) return res.status(401).json({
        token: null,
        message: 'Invalid password'
    })

    const token = jwt.sign({ id: userExist._id }, process.env.SECRET_KEY, {
        expiresIn: 86400
    })

    return res.json({
        _id: userExist._id,
        name: userExist.name,
        message: 'Auth succesful',
        token: token
    })

}