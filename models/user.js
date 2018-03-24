const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    status:{
        type:String,
        required:true
    },
    count:Number,
    email:String,
    password:String,
});

module.exports = mongoose.models('student',studentSchema);


