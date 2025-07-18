const userModel = require('../models/user.model');

module.exports.createUser = async ({
    firstname, lastname, email, password
}) => {
    if (!firstname || !email || !password) {
        throw new Error('Firstname, email, and password are required');
    }

    const user = await userModel.create({
        fullname:{
            firstname,
            lastname,
        },
        email,
        password
    });

    return user;
}

module.exports.findUser = async ({
    email
}) => {
    if (!email) {
        throw new Error('Email is required');
    }

    const user = await userModel.findOne({ email }).select('+password');

    return user;
}