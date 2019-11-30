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
        <div className="description">
          <h2>遊戲玩法</h2>
          <p>遊戲開始時，可選擇棋盤上任何空格下子</p>
          <p>遊戲開始後，只能在棋子連線範圍內下子</p>
          <p>跨格連線中間經過的格子必須為空格，倘若之後對方下子在空格時，該連線將會失效</p>
          <p>當原本的連線失效時，棋子將會尋找新的連線方式，若找不到時，該棋子的連線範圍將會失效</p>
          <p>當連線範圍失效的棋子找到新的連線方式時，該棋子的連線範圍將會恢復</p>
          <p>當對方無法繼續下子時，即為我方的勝利</p>
        </div>
        <div className="button-group">
          <button className="exit" onClick={this.leavePage} />
        </div>
      </div>
    );
  }
}

export default connector(HelpPage);
