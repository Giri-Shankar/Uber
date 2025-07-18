const captainModel = require('../models/captain.model');
const { validationResult } = require('express-validator');
const captainService = require('../services/captain.service');
const blacklistTokenModel = require('../models/blacklistToken.model')

module.exports.registerCaptain = async (req, res) => {

    // Ensure that express-validator middleware is applied in your route before this controller
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, status, vehicle, location } = req.body;

    const isAlreadyExisting = await captainModel.findOne({email});

    if (isAlreadyExisting) {
        return res.status(400).json({ message: 'captain already exists' });
    }

    const hashedPassword = await captainModel.hashPassword(password)

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        status,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
        lat: location.lat,
        long: location.long
    });

    if(!captain) {
        return res.status(400).json({ message: 'captain failed to register' });
    }

    const token = captain.generateAuthToken();

    res.cookie('token', token)

    res.status(200).json({ token, captain })
}

module.exports.loginCaptain = async (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    const captain = await captainModel.findOne({ email }).select('+password')

    if(!captain){
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await captain.comparePassword(password)

    if(!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = captain.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({ token, captain }) 
}

module.exports.getProfile = async (req, res) => {
    res.status(200).json(req.captain)
}

module.exports.logout = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    await blacklistTokenModel.create({token});

    res.clearCookie('token');

    res.status(200).json({ message: 'logged out' });
}