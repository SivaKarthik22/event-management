const express = require('express');
const EventModel = require('../models/EventModel.js');
const eventRouter = express.Router();

eventRouter.post('/create-event', async (req, resp)=>{
    try{
        const newEventDoc = new EventModel(req.body);
        await newEventDoc.save();
        
        resp.status(201).send({
            success: true,
            message: "New event created successfully"
        });
    }
    catch(error){
        resp.status(500).send({
            success: false,
            message: `Failed to create event: ${error.message}`
        });
    }
});

eventRouter.put('/update-event', async (req, resp)=>{
    try{
        const eventDoc = await EventModel.findByIdAndUpdate(req.body._id, req.body, {new: true});
        if(!eventDoc){
            return resp.status(404).send({
                success: false,
                message: "No such event exists",
            });
        }

        resp.send({
            success: true,
            message: "Event updated successfully",
            data: eventDoc,
        });
    }
    catch(error){
        resp.status(500).send({
            success: false,
            message: `Failed to update event: ${error.message}`,
        });
    }
});

eventRouter.get("/get-events-by-profile/:profileId", async (req, resp)=>{
    try{
        const eventDocsArray = await EventModel.find({ profiles: req.params.profileId }).populate("profiles");
        resp.send({
            success: true,
            message: "Events fetched succesfully",
            data: eventDocsArray,
        });
    }
    catch(error){
        resp.status(500).send({
            success: false,
            message: `Failed to fetch events: ${error.message}`
        });
    }
});

module.exports = eventRouter;