const mongoose = require('mongoose');

const userPostSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    data:{
        type:Object,
        require:true
    }
})

const UserPosts = mongoose.model('UserPosts', userPostSchema);

module.exports = UserPosts;