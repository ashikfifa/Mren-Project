 
//declare 
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); //connect mongodb

//environment variable
require('dotenv').config();

//create express seriver and give port
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());  //allow json. Sending and rcving json


//for this .env file should set
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useUnifiedTopology: true,useNewUrlParser: true, useCreateIndex: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

//start the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});