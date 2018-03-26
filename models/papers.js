const mongoose = require('mongoose');
const { Schema } = mongoose;

const paperSchema = new Schema({
    user:[{
       type:Schema.Types.ObjectId
    }],
    title:{
        type:String,
        trim:true,
        unique:true,
        required:true
    },
    class:{
      type:String,
      trm:true,
      lowercase:true,
      required:true
    },
    rating:{
        type:Number,
        default:0
    },
    date:{
        type:Date,
        default:Date.now
    },
    highlights:{
        type:String,
        required:true,
    }
});

module.exports = mongoose.model('paper',paperSchema);

