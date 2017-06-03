/*
 1. 学习localStorage，完成加载之前的评论
 2. 为什么+new Date()
 */

import React,{Component,PropTypes} from 'react';
import ReactDOM from 'react-dom';
import './index.css'

import {Button} from 'antd';
import {default as SignUpForm} from './components/SignUpForm';
import {default as TopBar} from './components/TopBar';
import {default as LogInForm} from './components/LogInForm';
import Books from './components/BooksPage';


import {Router, Route, hashHistory, browserHistory, IndexRoute} from 'react-router';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" components={TopBar}>
            <IndexRoute components={Books}/>
            <Route path="/users/register" component={SignUpForm}/>
            <Route path="/users/login" component={LogInForm}/>
        </Route>
    </Router>,
    document.getElementById('app')
);
