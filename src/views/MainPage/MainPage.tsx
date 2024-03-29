import './main-page.scss';
import React from 'react';
import { Redirect } from 'react-router';
import { connector, PageProps } from '../../containers/page';

class MainPage extends React.Component<PageProps> {
  render() {
    let { pagePath, switchPageTo } = this.props;

    if (pagePath !== 'main') {
      return <Redirect to={`/${pagePath}`} />;
    }

    return (
      <div id="main-page" className="page">
        <div className="title">Relati</div>
        <div className="button-group">
          <button className="play" onClick={() => switchPageTo('game')} />
          <button className="help" onClick={() => switchPageTo('help')} />
        </div>
      </div>
    );
  }
}

export default connector(MainPage);
