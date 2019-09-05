import './game-page.scss';
import React from 'react';
import { Redirect } from 'react-router';
import { connector, AppProps } from '../../containers';
import { Board, Hint } from '../../components/RelatiGame';
import Effect from '../../components/RelatiGameEffect/Effect';
import { RelatiSymbolColor, RelatiSymbol } from '../../modules/game';
import socketIO from 'socket.io-client';

let socketClient = socketIO();

socketClient.on("player-found", (socketId: string, symbol: RelatiSymbol) => {
  page.props.playerFound(socketId, symbol);
  page.props.hideMessageBox();

  page.props.showMessageBox("HINT", symbol.toLowerCase() + "win", `你是${symbol}`, () => {
    page.props.hideMessageBox();
  });
});

socketClient.on("player-select-grid", ({ x, y }: { x: number, y: number }) => {
  let { game, game: { board } } = page.props.arena;
  let grid = board.getGrid(x, y);
  page.props.playerSelectGrid(grid);

  if (game.winner) {
    let icon = game.winner.toLowerCase() + "win";
    let text = game.winner + "獲勝";

    page.props.showMessageBox("YORN", icon, text, result => {
      if (result) {
        page.props.arena.game.restart();
        page.props.showMessageBox("INFO", "dots rotate", "正在尋找");
        socketClient.emit("player-find");
      }
    });
  } else if (game.winner !== null) {
    let icon = "draw";
    let text = "平手";

    page.props.showMessageBox("YORN", icon, text, result => {
      if (result) {
        page.props.arena.game.restart();
        page.props.showMessageBox("INFO", "dots rotate", "正在尋找");
        socketClient.emit("player-find");
      }
    });
  }
});

socketClient.on("player-leave", () => {
  let symbol = page.props.arena.playerSymbol;
  let icon = symbol.toLowerCase() + "win";
  let text = symbol + "獲勝";
  page.props.playerLeave();

  page.props.showMessageBox("YORN", icon, text, result => {
    if (result) {
      page.props.arena.game.restart();
      page.props.showMessageBox("INFO", "dots rotate", "正在尋找");
      socketClient.emit("player-find");
    }
  });
});

let page: GamePage;

class GamePage extends React.Component<AppProps> {
  public onCoorSelect = ({ x, y }: { x: number, y: number }) => {
    let { game, playerSymbol, opponentSocketId } = this.props.arena;

    if (game.nowPlayerSymbol === playerSymbol) {
      socketClient.emit("player-select-grid", { x, y }, opponentSocketId);
    }
  };

  public leavePage = () => {
    this.props.showMessageBox("YORN", "yorn", "確認離開?", result => {
      if (result) {
        this.props.switchPageTo("main");
        socketClient.emit("player-leave", this.props.arena.opponentSocketId);
        this.props.playerLeave();
        this.props.arena.game.restart();
      }
    });
  };

  constructor(props: AppProps) {
    super(props);
    page = this;

    if (this.props.pagePath === 'game') {
      this.props.showMessageBox("INFO", "dots rotate", "正在尋找");
      socketClient.emit("player-find");
    }
  }

  public render() {
    let {
      arena: {
        game: {
          turn, board, routeType, nowPlayerSymbol: symbol
        }, game,
        lastCoor
      }, pagePath
    } = this.props;

    let hints = game.getPlaceableGrids(symbol).map(
      ({ x, y }, key) => (
        <Hint key={key} x={x} y={y} color={RelatiSymbolColor[symbol]} />
      )
    );

    let focusedGrid = lastCoor && board.getGrid(lastCoor.x, lastCoor.y);

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
        <Board id="game-board" width={board.width} height={board.height} onCoorSelect={this.onCoorSelect}>
          <g className="hints">{hints}</g>
          <Effect turn={turn} symbol={symbol} board={board} routeType={routeType} focus={focusedGrid} />
        </Board>
        <div className="button-group">
          <button className="exit" onClick={this.leavePage} />
        </div>
      </div>
    );
  }
}

export default connector(GamePage);
