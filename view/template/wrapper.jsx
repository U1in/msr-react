import React from 'react';

const isServer = typeof window === "undefined";

class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
    }
  }  

  componentDidMount = () => {
    if(!isServer) {
      if(!window.__SERVERDATA__) {
        if(this.props.children && this.props.children.type && this.props.children.type.getInitProps) {
          this.props.children.type.getInitProps().then(resp => {
            this.setState({
              data: resp
            })
          });
        }
      } else {
        this.setState({
          data: window.__SERVERDATA__
        }, () => {
          delete window.__SERVERDATA__
        })
      }
    }
  }

  //防止组件销毁后进行setState
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return
    }
  }

  render () {
    const { children, ...restProps} = this.props;
    return children && React.cloneElement(children, { ...restProps, _data: this.state.data })
  }
}

export default Wrapper;