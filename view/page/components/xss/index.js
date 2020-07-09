import React from 'react';
import axios from '../../utils/axios';
import Layout from '../layout/index';
import './index.less';

import { Input, Alert } from 'antd';

class XSS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: undefined,
    }
  }

  static getInitProps = async () => {
    const result = await axios({
      method: 'POST',
      url: '/apis?API_NAME=GET_TEST'
    });
    if(result.code === 0) {
      return result.message;
    } else {
      return false;
    }
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
          {
            this.props._data
            ?
            <Alert  message={this.props._data} type="info" showIcon />
            :
            null
          }
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