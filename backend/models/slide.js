const mongoose = require('mongoose');
// Get the Schema constructor
var Schema = mongoose.Schema;

const slideSchema = mongoose.Schema({
    heading : {type:String,required : true},
    subheading :{type:String,required : true},
    imagePath :{type:String , required : true}
});

module.exports = mongoose.model('Slide',slideSchema);
