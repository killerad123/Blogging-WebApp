const mongoose = require('mongoose')
const blogModel = mongoose.Schema({
    title:String,
    desc:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    ],
    date:{
        type:Date,
        default:Date.now
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'comment'
        }
    ]
})

module.exports = mongoose.model("blog", blogModel)