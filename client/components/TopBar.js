/**
 * Created by zay on 2017/6/2.
 */
import React from 'react';
import {Menu, Icon} from 'antd';
import {Link} from 'react-router'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class TopBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {current: 'book'};
    }

    handleClick(e) {
        this.setState({current: e.key});
    }

    render() {
        return (
            <div>
                <Menu
                    onClick={this.handleClick.bind(this)}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                >
                    <Menu.Item key="book">
                        <Link to="/"><Icon type="book"/>图书信息</Link>
                    </Menu.Item>

                    <Menu.Item key="user">
                        <Link to="/users"><Icon type="user"/>个人信息</Link>
                    </Menu.Item>
                    <div className="top_left">
                        <ul className="horizontal_list">
                            <li><Link to="/users/login">登陆</Link></li>
                            <li><Link to="/users/register">注册</Link></li>
                        </ul>
                    </div>
                </Menu>

                {this.props.children}
            </div>
        );
    }
}