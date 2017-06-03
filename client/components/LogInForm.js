/**
 * Created by zay on 2017/6/2.
 */

import React from 'react';
import {Form,Input,Button} from 'antd';
import Auth from '../modules/Auth';
import {browserHistory} from 'react-router';

const FormItem=Form.Item;

class LogInForm extends React.Component {
    constructor(props){
        super(props);

        this.form=document.querySelector("form");
    }

    handleSubmit(e){
        e.preventDefault();

        const body=JSON.stringify({username:this.username,password:this.password});
        const headers=new Headers({'Content-Type':'application/json'});
        const config={
            method:'POST',
            body,
            headers
        };
        const request=new Request('/users/login',config);

        fetch(request).then((response)=>{
            if(response.ok){
                return response.json();
            } else {
                alert('用户名已存在!');
            }
        }).then((json)=>{
            Auth.authenticateUser(json.token);
            browserHistory.push('/');
        });
    }

    handleInputChange(e){
        const name=e.target.name;
        this[name]=e.target.value;
    }

    render(){
        const { getFieldDecorator } = this.props.form;

        const formItemLayout={
            labelCol:{
                xs:{span:24},
                sm:{span:6},
            },
            wrapperCol:{
                xs:{span:24},
                sm:{span:14},
            }
        };

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };

        return (
            <Form onSubmit={this.handleSubmit.bind(this)} className="form">

                <FormItem {...formItemLayout} label="用户名">
                    {getFieldDecorator('nickname', {
                        rules: [{
                            required: true, message: '请输入你的用户名!', whitespace: true }],
                    })(
                        <Input type="text" onChange={this.handleInputChange.bind(this)} name="username"/>
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="Password"
                    hasFeedback
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: '请输入你的密码!',
                        }],
                    })(
                        <Input type="password" onChange={this.handleInputChange.bind(this)} name="password"/>
                    )}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" size="large">登陆</Button>
                </FormItem>
            </Form>
        )
    }
}

const WrappedLogInForm = Form.create()(LogInForm);

export default WrappedLogInForm;