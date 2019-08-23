// import './help-page.scss';
import React from 'react';
import { Redirect } from 'react-router';
import { connector, AppProps } from '../../containers';

class HelpPage extends React.Component<AppProps> {
  render() {
    let { pagePath, switchPageTo } = this.props;

    if (pagePath !== 'help') {
      return <Redirect to={`/${pagePath}`} />;
    }

    return (
      <div id="help-page" className="page">
        <div className="button-group">
          <button className="exit" onClick={() => switchPageTo('main')} />
        </div>
      </div>
    );
  }
}

export default connector(HelpPage);
