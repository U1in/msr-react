import React from 'react';
import loadable from '@loadable/component'
import axios from '../../utils/axios';
import './index.less';

import { Button } from 'antd';

const Layout = loadable(() => import('../layout/index'))

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  handleMenuClick = ({key}) => {
    this.props.history.push(key);
  }

  render() {

    const {
    } = this.state;

    const {
    } = this;

    return (
      <Layout>
        <div styleName="title">
          React同构渲染框架
        </div>
      </Layout>
    )
  }
}

export default Index;