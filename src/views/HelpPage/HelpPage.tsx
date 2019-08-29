import './help-page.scss';
import React from 'react';
import { Redirect } from 'react-router';
import { connector, AppProps } from '../../containers';

class HelpPage extends React.Component<AppProps> {
  public leavePage = () => {
    this.props.showMessageBox("YORN", "yorn", "確認離開?", result => {
      if (result) {
        this.props.switchPageTo("main");
      }
    });
  };

  render() {
    let { pagePath } = this.props;

    if (pagePath !== 'help') {
      return <Redirect to={`/${pagePath}`} />;
    }

    return (
      <div id="help-page" className="page">
        <div className="button-group">
          <button className="exit" onClick={this.leavePage} />
        </div>
      </div>
    );
  }
}

export default connector(HelpPage);
