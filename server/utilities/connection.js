const mongoose = require('mongoose');
function connection(params) {
    mongoose.connect('mongodb://127.0.0.1:27017/movieApp').then(()=>{
        console.log("connetced")
    })
}

module.exports = connection;