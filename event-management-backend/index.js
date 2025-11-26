require('dotenv').config();

const express = require('express');
const connectDB = require('./dbConfig');
const eventRouter = require('./routes/EventRoutes');
const userRouter = require('./routes/UserRoutes');
// const path = require('path');

const app = express();

connectDB();

// const clientBuildPath = path.join(__dirname, "../client/dist");
// app.use(express.static(clientBuildPath));

app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/events', eventRouter);

app.listen(8080, ()=>{
    console.log("server started at port 8080");
});