const mongoose = require('mongoose');
const LogModel = require('./LogModel');

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
}, { timestamps: true });

eventSchema.post('findOneAndUpdate', async function (doc, next) {
    try {
        const update = this.getUpdate()["$set"];
        const logEntry = new LogModel({
            eventId: doc._id,
            action: 'updated',
            changes: update,
        });
        await logEntry.save();
        next();
    } catch (error) {
        next(error);
    }
});
eventSchema.post('save', async function (doc, next) {
    try {
        const logEntry = new LogModel({
            eventId: doc._id,
            action: 'created',
            changes: doc,
        });
        await logEntry.save();
        next();
    } catch (error) {
        next(error);
    }
});

const EventModel = mongoose.model('event', eventSchema);
module.exports = EventModel;

