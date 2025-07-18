const captainModel = require('../models/captain.model');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model')

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

    if (!token) {
        return res.status(400).json({ message : 'Unauthorized' });
    }

    const isblacklisted = await blacklistTokenModel.findOne({token});

    if(isblacklisted){
        return res.status(400).json({ message: 'Unauthorized' });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);

        req.captain = captain;
        return next()

    } catch(err) {
        return res.status(400).json(err);
    }
}