const express = require('express');
const LogModel = require('../models/LogModel.js');
const logRouter = express.Router();

logRouter.get("/get-logs-by-event/:eventId", async (req, resp)=>{
    try{
        const logDocsArray = await LogModel.find({ eventId: req.params.eventId });
        resp.send({
            success: true,
            message: "Event History fetched succesfully",
            data: logDocsArray,
        });
    }
    catch(error){
        resp.status(500).send({
            success: false,
            message: `Failed to fetch Event History: ${error.message}`
        });
    }
});

module.exports = logRouter;