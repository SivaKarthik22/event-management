const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    profiles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "profile",
        required: true
      }
    ],
    timezone: {
        type: String,
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
}, {timestamps: true});


const EventModel = mongoose.model('event', eventSchema);
module.exports = EventModel;

