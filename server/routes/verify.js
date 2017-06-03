/**
 * Created by zay on 2017/6/2.
 */
const User=require('../models/user');
const jwt=require('jsonwebtoken');
const config=require('../config.js');

exports.getToken=function(user){
    return jwt.sign(user,config.secretKey,{
        expiresIn:3600
    });
};

exports.verifyOrdinaryUser=function(req,res,next){
    const token=req.body.token||req.query.token||req.headers['x-access-token'];

    if(token){
        jwt.verify(token,config.secretKey,function(err,decoded){
            if(err){
                const err=new Error('You are not authenticated!');
                err.status=401;
                return next(err);
            } else{
                req.decoded=decoded;
                next();
            }
        });
    } else{
        const err=new Error('No token provided!');
        err.status=403;
        return next(err);
    }
};