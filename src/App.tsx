import './App.scss';
import { store } from './state';
import { GamePage } from './views/GamePage';
import { HelpPage } from './views/HelpPage';
import { MainPage } from './views/MainPage';

import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';

let defaultPagePath = `/${store.getState().pagePath}`;

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" render={() => <Redirect to={defaultPagePath} />} />
        <Route path="/main" component={MainPage} />
        <Route path="/game" component={GamePage} />
        <Route path="/help" component={HelpPage} />
      </Router>
    </Provider>
  );
}

export default App;
