const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:String,
    email:String,
    password:String,
    blogs:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'blog'
        }
    ]
})

module.exports = mongoose.model("user",userSchema)