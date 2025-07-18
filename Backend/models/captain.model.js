const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname:{
            type: String,
            required: true,
            minlength: [2, 'Firstname must be minimum of 2 characters']
        },
        lastname:{
            type: String,
            minlength: [2, 'Lastname must be minimum of 2 characters']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be minimum of 5 characters']
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be minimum of 6 characters'],
        select: false
    },
    socketId: {
        type: String,
    },

    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },

    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'Color must be minimum of 3 characters']
        },
        plate: {
            type: String,
            required: true,
            minlength: [8, 'Number Plate must be minimum of 8 characters']
        },
        capacity: {
            type: Number,
            required: true,
            minlength: 1
        },
        vehicleType: {
            type: String,
            enum: ['car', 'auto', 'two-wheeler'],
            required: true
        }
    },

    location: {
        lat: {
            type: Number
        },
        long: {
            type: Number
        }
    }
});


captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token; 
};

captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
}


const captainModel = mongoose.model('captain', captainSchema);

module.exports = captainModel;