import React, { CSSProperties } from "react";
import { RelatiGrid, RelatiSymbolColor } from "../../modules/game";

interface GridProps { grid: RelatiGrid; focus?: boolean; }

const SymbolPathMap = {
  O: "m 0 -1.5, a 1.5 1.5, 0 0 1, 0 3, a 1.5 1.5, 0 0 1, 0 -3",
  X: "m -1.5 -1.5, l 3 3, m 0 -3, l -3 3"
};

export default function Grid({ grid, focus = false }: GridProps) {
  if (!grid.body) return <></>;

  let paths = [];
  let x = grid.x * 5 + 2.5;
  let y = grid.y * 5 + 2.5;

  let symbolProps = {
    d: `M ${x} ${y}, ${SymbolPathMap[grid.body.symbol as "O" | "X"]}`,
    fill: "none",
    key: "1",
    stroke: RelatiSymbolColor[grid.body.symbol],
    strokeWidth: "0.6",
    opacity: ""
  };

  if (grid.body.is("launcher")) {
    symbolProps.strokeWidth = "1";
    paths.push(<path {...symbolProps} />);
    symbolProps.key = "2";
    symbolProps.stroke = "#f2f2f2";
    symbolProps.strokeWidth = "0.5";
  } else if (!grid.body.is("repeater")) {
    symbolProps.stroke = "#666";
  }

  paths.push(<path {...symbolProps} />);

  if (focus) {
    symbolProps.key = "0";
    symbolProps.strokeWidth = "1";
    symbolProps.opacity = "0.4";
    paths.unshift(<path {...symbolProps} />);
  }

  return <g>{paths}</g>;
}
