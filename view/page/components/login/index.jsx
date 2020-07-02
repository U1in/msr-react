import React from 'react';
import axios from '../../utils/axios';
import { withRouter } from 'react-router-dom'
import './index.less';

import { Input, Button } from 'antd';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }

  handleInputUsername = (e) => {
    this.setState({
      username: e.target.value,
    })
  }

  handleInputPassword = (e) => {
    this.setState({
      password: e.target.value,
    })
  }

  handleSubmit = () => {
    const data = {
      username: this.state.username,
      password: this.state.password
    }
    axios({
      url: '/login',
      method: 'POST',
      data,
    }).then(resp => {
      this.props.history.push('/index');
    }).catch(error => {
      console.log(error);
    }) 
  }

  render() {
    const {
      username,
      password,
    } = this.state;

    const {
      handleInputUsername,
      handleInputPassword,
      handleSubmit,
    } = this;

    return (
      <div styleName="container">
        <div styleName="login-container">
          <div styleName="login-title">登 陆</div>
          <div styleName="login-input">
            <Input
              placeholder="请输入用户名"
              style={{ borderRadius: '4px' }}
              onChange={ handleInputUsername }
              value={username}
            />
            <Input.Password
              placeholder="请输入密码"
              style={{ borderRadius: '4px' }}
              onChange={ handleInputPassword }
              value={password}
            />
          </div>
          <div styleName="login-submit">
            <Button
              type="primary"
              style={{width: '100%'}}
              onClick={handleSubmit}
            >
              登 陆
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Login);