import React from 'react';
import axios from '../../utils/axios';
import loadable from '@loadable/component'
import '../../../global/csrf.global.less';
import './index.less';

import { message, Button, Alert } from 'antd';

const Layout = loadable(() => import('../layout/index'))

class CSRF extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  static getInitProps = async () => {
    const result = await axios({
      method: 'GET',
      url: 'http://localhost:9123/test'
    });
    return result;
  }

  handleTestCsrf = () => {
    axios({
      method: 'POST',
      url: 'http://localhost:9123/csrf',
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
          <Alert  message={this.props._data} type="info" showIcon />
          <div styleName="title">CSRF</div>
          <Button style={{marginTop: '20px'}} type="primary" onClick={() => this.handleTestCsrf()}>测试CSRF</Button>
        </div>
      </Layout>
    )
  }
}

export default CSRF;