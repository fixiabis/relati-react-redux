import './game-page.scss';
import React from 'react';
import { Redirect } from 'react-router';
import { connector, AppProps } from '../../containers';
import { Board } from '../../components/RelatiGame';

class GamePage extends React.Component<AppProps> {
  render() {
    let { pagePath, switchPageTo, arena: { game: { board } } } = this.props;

    if (pagePath !== 'game') {
      return <Redirect to={`/${pagePath}`} />;
    }

    return (
      <div id="game-page" className="page">
        <div className="versus-header">
          <div className="player-o" />
          <div className="versus" />
          <div className="player-x" />
        </div>
        <Board id="game-board" width={board.width} height={board.height} />
        <div className="button-group">
          <button className="exit" onClick={() => switchPageTo('main')} />
        </div>
      </div>
    );
  }
}

export default connector(GamePage);
