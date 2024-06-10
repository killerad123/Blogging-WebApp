const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    text:String,
    commentBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("comment",commentSchema)