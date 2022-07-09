const mongoose = require('mongoose');
// Get the Schema constructor
var Schema = mongoose.Schema;

const staffSchema = mongoose.Schema({
    name : {type:String,required : true},
    qualification :{type:String,required : true},
    classteacher :{type:String,required : true},
    testimonial :{type:String,required : true},
    imagePath :{type:String , required : true}

});

module.exports = mongoose.model('Staff',staffSchema);
