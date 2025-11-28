const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    }
});


const ProfileModel = mongoose.model('profile', profileSchema);
module.exports = ProfileModel;
