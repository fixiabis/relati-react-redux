import './App.scss';
import { store } from './containers';
import { GamePage } from './views/GamePage';
import { HelpPage } from './views/HelpPage';
import { MainPage } from './views/MainPage';

import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import { MessageBox } from './components/MessageBox';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" render={() => <Redirect to="/main" />} />
        <Route path="/main" component={MainPage} />
        <Route path="/game" component={GamePage} />
        <Route path="/help" component={HelpPage} />
      </Router>
      <MessageBox />
    </Provider>
  );
}

export default App;
