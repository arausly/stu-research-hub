const mongoose = require('mongoose');
const { Schema } = mongoose;

const paperSchema = new Schema({
    user:[{
       type:Schema.Types.ObjectId
    }],
    paper:{
        type:String
    },
    rating:{
        type:Number,
        default:0
    }
});

module.exports = mongoose.model('paper',paperSchema);

