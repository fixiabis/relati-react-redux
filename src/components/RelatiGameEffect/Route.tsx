import React from "react";
import { RelatiGrid, RelatiRole, RelatiSymbolColor } from "../../game";

interface RouteProps {
  grids: RelatiGrid[];
}

export default function Route({ grids }: RouteProps) {
  if (!grids[0]) return <></>;

  let routeStyle = {
    d: `M ${grids.map(({ x, y }) => (
      `${x * 5 + 2.5} ${y * 5 + 2.5}`
    )).join(", L ")}`,
    fill: "none",
    stroke: RelatiSymbolColor[(grids[0].body as RelatiRole).symbol],
    strokeWidth: "0.6",
  };

  return <path {...routeStyle} />;
}
