const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "event",
        required: true
    },
    action:{
        type: String,
        required: true,
    },
    changes:{
        type: Object,
    }
}, {timestamps: true});


const LogModel = mongoose.model('log', logSchema);
module.exports = LogModel;

