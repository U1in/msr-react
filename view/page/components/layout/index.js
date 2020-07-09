import React from 'react';
import { withRouter } from 'react-router-dom'
import './index.less';

import {
  UnorderedListOutlined,
  KeyOutlined,
} from '@ant-design/icons';

import { Menu, Input } from 'antd';


class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  handleMenuClick = ({key}) => {
    this.props.history.push(key);
  }

  render() {
    const { children, staticContext, ...restProps} = this.props;
    return (
      <div styleName="container">
        <div styleName="menu">
          <Input
            placeholder="请输入搜索内容"
            styleName="search"
          />
          <Menu
            onClick={this.handleMenuClick}
            defaultSelectedKeys={[this.props.location.pathname]}
            mode="inline"
            style={{flexGrow: 1, flexShrink: 1}}
          >
            <Menu.Item key="/index" icon={<UnorderedListOutlined />}>
              总览
            </Menu.Item>
            <Menu.Item key="/csrf" icon={<KeyOutlined />}>
              CSRF
            </Menu.Item>
            <Menu.Item key="/xss" icon={<KeyOutlined />}>
              XSS
            </Menu.Item>
          </Menu>
        </div>
        <div styleName="search-container">
          {
            children && React.cloneElement(children, { ...restProps })
          }
        </div>
      </div>
    )
  }
}

export default withRouter(Layout);