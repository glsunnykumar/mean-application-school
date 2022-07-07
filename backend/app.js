const path =require("path");
const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const studentRoutes = require('./routes/student');



const app = express();
//mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false
//mongoose.connect("mongodb+srv://mongodb:X5YZjCuGrHyiglD0@cluster0.hyyeo.mongodb.net/test?authSource=admin&replicaSet=atlas-nbn9qz-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true")
mongoose.connect("mongodb+srv://mongodb:KtKvNofWFnITJYaZ@cluster0.hyyeo.mongodb.net/test")
  .then(() => {
    console.log('Connect');
  })
  .catch(() => {
    console.log('Connection to db is failed');
  })
  ;

app.use(bodyParser.json());
app.use("/images",express.static("backend/images"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE,OPTIONS");
  next();
})

app.use("/api/posts" ,postRoutes);
app.use("/api/users",userRoutes);
app.use("/api/students",studentRoutes);


module.exports = app;
