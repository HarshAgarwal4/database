let mongoose = require('mongoose');

let formSchema = new mongoose.Schema({
    name: {
        type: String,
        require : true
    },
    username:{
        type: String,
        require : true,
        unique: true
    },
    password:{
        type: String,
        require : true,
    },
    phone: {
        type: String,
        require : true,
        unique: true
    },
    email: {
        type: String,
        require : true,
        unique: true
    },
    msg: {
        type: String,
        require : true
    },
})

let form = mongoose.model('formdata', formSchema);

module.exports = form;