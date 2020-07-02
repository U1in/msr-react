import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Routers from '../../view/page/router';
import Wrapper from '../template/wrapper';

class App extends React.Component {
  render() {
    return (
      <Switch>
        {
          Routers.map(route => (
            <Route key={route.name} path={route.path} exact render={ () => {
              const Component = route.component();
              const title = route.title;
              document.title = title;
              return (
                <Wrapper title={title}>
                  <Component/>
                </Wrapper>
              )
            }}/>
          ))
        }
      </Switch>
    )
  }
}

export default App;