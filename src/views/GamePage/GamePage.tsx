// import './game-page.scss';
import React from 'react';
import { Redirect } from 'react-router';
import { connector, AppProps } from '../../state';

class GamePage extends React.Component<AppProps> {
  render() {
    let { pagePath, switchPageTo } = this.props;

    if (pagePath !== 'game') {
      return <Redirect to={`/${pagePath}`} />;
    }

    return (
      <div id="game-page" className="page">
        <div className="button-group">
          <button className="exit" onClick={() => switchPageTo('main')} />
        </div>
      </div>
    );
  }
}

export default connector(GamePage);
