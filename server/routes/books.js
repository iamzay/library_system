/**
 * Created by zay on 2017/6/2.
 */
const express=require('express');
const router=express.Router();
const Verify=require('./verify');

router.route('/')
.get(function(req,res,next){
    res.send('These are all books!');
})

.post(Verify.verifyOrdinaryUser,function(req,res,next){
    res.send('post success!')
})

.delete(Verify.verifyOrdinaryUser,function(req,res,next){
    res.send('delete success!')
});

module.exports=router;