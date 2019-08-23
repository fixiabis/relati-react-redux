import React from "react";
import "./relati-board.scss";

type BoardProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  id: string,
  width: number,
  height: number,
  onCoorSelect?: (coor: { x: number, y: number }) => void
};

interface BoardState { scaleRatio: number; }

export default class Board extends React.Component<BoardProps, BoardState> {
  public width: number;
  public height: number;

  constructor(props: BoardProps) {
    super(props);

    this.width = props.width * 5;
    this.height = props.height * 5;
    this.state = { scaleRatio: 0 };

    window.addEventListener("resize", (e) => this.resize());
  }

  public resize() {
    let container = document.getElementById(this.props.id);
    if (!container) return;

    let containerWidth = container.offsetWidth;
    let containerHeight = container.offsetHeight;

    let scaleRatio = Math.min(
      containerWidth / this.width,
      containerHeight / this.height
    ) * 0.95;

    this.setState({ scaleRatio });
  }

  public onBoardClick(e: React.MouseEvent) {
    let { onCoorSelect } = this.props;
    let { offsetX, offsetY } = e.nativeEvent;
    let x = Math.floor(offsetX / 5);
    let y = Math.floor(offsetY / 5);
    if (onCoorSelect) onCoorSelect({ x, y });
  }

  public componentDidMount() { this.resize(); }

  public render() {
    let { width, height, props, props: { id, children } } = this;

    let boardStyle = {
      height,
      transform: `scale(${this.state.scaleRatio})`,
      width
    };

    let horizonLines = [];
    let verticalLines = [];

    for (let x = 1; x < props.height; x++) {
      horizonLines.push(
        <path key={x} stroke="#888" strokeWidth="0.4" d={`M 0 ${x * 5} H ${width}`} />
      );
    }

    for (let y = 1; y < props.width; y++) {
      verticalLines.push(
        <path key={y} stroke="#888" strokeWidth="0.4" d={`M ${y * 5} 0 V ${height}`} />
      );
    }

    return (
      <div id={id} className="board-container">
        <div className="relati-board" style={boardStyle}>
          <svg width={width} height={height}>
            {children}
            <g className="grid-lines">
              {horizonLines}
              {verticalLines}
            </g>
          </svg>
          <div onClick={e => this.onBoardClick(e)} />
        </div>
      </div>
    );
  }
}
