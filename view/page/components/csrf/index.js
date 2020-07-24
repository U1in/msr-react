import React from 'react';
import axios from '../../utils/axios';
import Layout from '../layout/index';
import '../../../global/index.global.less';
import './index.less';

import { message, Button, Alert } from 'antd';

class CSRF extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  static getInitProps = async () => {
    const result = await axios({
      method: 'POST',
      url: '/apis?API_NAME=GET_TEST'
    });
    if(result.code === 0) {
      return result.message;
    } else {
      return false
    }
  }

  handleTestCsrf = () => {
    axios({
      method: 'POST',
      url: '/apis?API_NAME=CSRF',
    }).then(resp => {
      if(resp.code === 0) {
        message.success(resp.message);
      }
    });
  }

  render() {

    const {
    } = this.state;

    const {
    } = this;

    return (
      <Layout>
        <div style={{ width: '100%' }}>
          {/* 避免闪烁 */}
          <Alert message={this.props._data} type="info" showIcon />
          <div styleName="title">CSRF</div>
          <Button style={{marginTop: '20px'}} type="primary" onClick={() => this.handleTestCsrf()}>测试CSRF</Button>
        </div>
      </Layout>
    )
  }
}

export default CSRF;