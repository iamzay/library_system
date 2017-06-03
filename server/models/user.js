/**
 * Created by zay on 2017/6/2.
 */
const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const passportLocalMongoose=require('passport-local-mongoose');

const User=new Schema({
    username:String,
    password:String,
    admin:{
        type:Boolean,
        default:false
    }
});

User.plugin(passportLocalMongoose);

module.exports=mongoose.model('User',User);
