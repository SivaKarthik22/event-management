require('dotenv').config();

const express = require('express');
const connectDB = require('./dbConfig');
const eventRouter = require('./routes/EventRoutes');
const profileRouter = require('./routes/ProfileRoutes');
const logRouter = require('./routes/LogRoutes');
const path = require('path');

const app = express();

connectDB();

const frontendBuildPath = path.join(__dirname, "../event-management-frontend/dist");
app.use(express.static(frontendBuildPath));

app.use(express.json());
app.use('/api/profiles', profileRouter);
app.use('/api/events', eventRouter);
app.use('/api/logs', logRouter);

app.listen(8080, ()=>{
    console.log("server started at port 8080");
});