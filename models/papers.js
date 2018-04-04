const mongoose = require('mongoose');
const { Schema } = mongoose;

const paperSchema = new Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    user:{
        type: Schema.Types.ObjectId, 
        ref: 'users'
    },
    filename:{
        type:String,
    },
    _createdAt:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model('paper',paperSchema);

