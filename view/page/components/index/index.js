import React from 'react';
import Layout from '../layout/index';
import './index.less';

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