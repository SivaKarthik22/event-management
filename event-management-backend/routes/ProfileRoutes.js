const express = require('express');
const ProfileModel = require('../models/ProfileModel.js');
const profileRouter = express.Router();

profileRouter.post('/create-profile', async (req, resp)=>{
    try{
        const existingProfileDoc = await ProfileModel.findOne({name: req.body.name});
        if(existingProfileDoc){
            return resp.status(400).send({
                success: false,
                message: "The profile already exists!"
            });
        }

        const newProfileDoc = new ProfileModel(req.body);
        await newProfileDoc.save();
        
        resp.status(201).send({
            success: true,
            message: "New profile created successfully"
        });
    }
    catch(error){
        resp.status(500).send({
            success: false,
            message: `Failed to create profile: ${error.message}`
        });
    }
});

profileRouter.get("/get-all-profiles", async (req, resp)=>{
    try{
        const allProfileDocsArray = await ProfileModel.find();
        resp.send({
            success: true,
            message: "All profiles fetched succesfully",
            data: allProfileDocsArray,
        });
    }
    catch(error){
        resp.status(500).send({
            success: false,
            message: `Failed to fetch all profiles: ${error.message}`
        });
    }
});

module.exports = profileRouter;