
const mongoose = require('mongoose');
// Get the Schema constructor
var Schema = mongoose.Schema;

const noticeSchema = mongoose.Schema({
    title : {type:String,required : true},
    pubdate :{type:Date,required : true},
    imagePath :{type:String , required : true}
});

module.exports = mongoose.model('Notice',noticeSchema);
