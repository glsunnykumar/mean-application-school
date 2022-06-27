const mongoose = require('mongoose');
// Get the Schema constructor
var Schema = mongoose.Schema;

const studentSchema = mongoose.Schema({
    name : {type:String,required : true},
    fathername :{type:String,required : true},
    mothername :{type:String,required : true},
    address :{type:String,required : true},
    category :{type:String,required : true},
    studentclass :{type:String,required : true},
    imagePath :{type:String , required : true}

});

module.exports = mongoose.model('Student',studentSchema);
