/**
 * Created by zay on 2017/6/2.
 */

import React from 'react';
import {Form,Input,Button} from 'antd';
const FormItem=Form.Item;

class SignUpForm extends React.Component {

    handleSubmit(e){
        e.preventDefault();

        const body=JSON.stringify({username:this.username,password:this.password});
        const headers=new Headers({'Content-Type':'application/json'});
        const config={
            method:'POST',
            body,
            headers
        };
        const request=new Request('/users/register',config);

        //alert(''+body.username+body.password);

        fetch(request).then((response)=>{
            if(response.ok){
                alert('register success!');
            } else{
                alert('register failed!');
            }
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
                        rules: [{ required: true, message: '请输入你的用户名!', whitespace: true }],
                    })(
                        <Input name="username" onChange={this.handleInputChange.bind(this)}/>
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
                        }, {
                            validator: this.checkConfirm,
                        }],
                    })(
                        <Input name="password" type="password" onChange={this.handleInputChange.bind(this)}/>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" size="large">注册</Button>
                </FormItem>
            </Form>
        )
    }
}

const WrappedRegistrationForm = Form.create()(SignUpForm);

export default WrappedRegistrationForm;