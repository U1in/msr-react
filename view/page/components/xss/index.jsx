import React from 'react';
import axios from '../../utils/axios';
import loadable from '@loadable/component'
import './index.less';

import { Input, Alert } from 'antd';
const Layout = loadable(() => import('../layout/index'))

class XSS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: undefined,
    }
  }

  static getInitProps = async () => {
    const result = await axios({
      method: 'GET',
      url: 'http://localhost:9123/test'
    });
    return result;
  }

  handleInput = (e) => {
    const value = e.target.value;
    this.setState({
      text: value,
    })
  }

  render() {

    const {
      text,
    } = this.state;

    const {
      handleInput
    } = this;

    return (
      <Layout>
        <div style={{ width: "100%" }}>
          <Alert  message={this.props._data} type="info" showIcon />
          <div styleName="title">XSS</div>
          <Input style={{ width: '100%'}} placeholder="请输入XSS Payload" onChange={handleInput} value={text}/>
          <div>
            {text}
          </div>
        </div>
      </Layout>
    )
  }
}

export default XSS;