const mongoose = require('mongoose');
const usernameRegex = /^[a-zA-Z0-9_]+$/;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: usernameRegex,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    profilePicture: {
        type: String,
    },

}, {
    versionKey: false,
});

const UserModel = mongoose.model('User', userSchema);

module.exports = { UserModel };
