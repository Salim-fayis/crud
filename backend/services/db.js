const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/datas',{
    useNewUrlParser:true


})

const User = new mongoose.Schema({
    name:{type:String , required: true},
    email:{type:String , required: true , unique:true},
    password: {type:String , required: true},
    address:{type:String },
    image:{type:String}
},
{collection:"datas"}
)

const model = mongoose.model('datas',User)


module.exports= User
