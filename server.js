/**
 * Created by zay on 2017/6/2.
 */
const express= require('express');
const path=require('path');
//const favicon=require('serve-favicon');
const logger=require('morgan');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const mongoose=require('mongoose');
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;

const config=require('./server/config');

mongoose.connect(config.mongoUrl);
const db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){
    console.log('Connected correctly to server');
});

const users=require('./server/routes/users');
const bookRouter=require('./server/routes/books');


const app=express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

// passport config
const User=require('./server/models/user');
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// 提供html文件
app.use(express.static(path.join(__dirname,'build')));

// 指定router
app.use('/users',users);
app.use('/books',bookRouter);

// catch 404 and forward to error handler
app.use(function(req,res,next){
    let err=new Error('Not Found');
    err.status=404;
    next(err);
});

app.use(function(err,req,res,next){
    res.status(err.status||500);
    res.json({
        message:err.message,
        error:{}
    });
});

app.listen(3000,'localhost',function(){
    console.log(`server running at http://localhost:3000/`);
});