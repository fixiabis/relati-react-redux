import "./effect.scss";
import React from "react";
import { RelatiBoard, RelatiGrid, RelatiRole, RelatiRouter, RelatiRouteType, RelatiSymbol } from "../../modules/game";
import { GridBoard } from "../../modules/game/GridBoard";
import Grid from "../RelatiGame/Grid";
import Route from "./Route";

interface EffectProps {
  turn: number;
  symbol: RelatiSymbol;
  routeType: RelatiRouteType;
  board: RelatiBoard;
  focus: RelatiGrid | null;
}

interface EffectState {
  turn: number;
  running: boolean;
  routes: RelatiGrid[][];
}

export default class Effect extends React.Component<EffectProps, EffectState> {
  public static getDerivedStateFromProps(props: EffectProps, state: EffectState) {
    if (props.turn !== state.turn) {
      return {
        routes: [],
        running: false,
        turn: props.turn
      };
    } else return null;
  }

  public board: RelatiBoard;
  public unmounted: boolean = false;
  public router: RelatiRouter;

  constructor(props: EffectProps) {
    super(props);

    this.state = {
      routes: [],
      running: false,
      turn: props.turn,
    };

    this.board = new GridBoard<RelatiRole>(props.board.width, props.board.height);
    this.router = new RelatiRouter(props.routeType);
  }

  public recovery(turn: number) {
    for (let { body: role } of this.board.grids) {
      if (role && role.is("launcher")) {
        this.relati(role, turn);
      }
    }
  }

  public relati(sourceRole: RelatiRole, turn: number, route: RelatiGrid[] = []) {
    if (sourceRole.is("repeater")) return;
    sourceRole.gain("repeater");

    let repeatRelati = () => {
      let routes: RelatiGrid[][] = this.router.getRoutes(
        sourceRole.grid, sourceRole.symbol, ["receiver"]
      );

      for (let relatiRoute of routes) {
        let [{ body: targetRole }] = relatiRoute;

        if (targetRole) {
          relatiRoute = [sourceRole.grid, ...relatiRoute.reverse()];
          this.relati(targetRole, turn, relatiRoute);
        }
      }
    };

    if (this.unmounted) return;

    if (this.state.turn === turn) {
      this.setState({
        routes: [...this.state.routes, route],
        running: true
      });

      setTimeout(repeatRelati, 250);
    } else repeatRelati();
  }

  public interrupt() {
    for (let { body: role } of this.board.grids) {
      if (role && role.symbol !== this.props.symbol) {
        role.lost("repeater");
      }
    }
  }

  public cloneBoard() {
    for (let { i, body: role } of this.props.board.grids) {
      let grid = this.board.grids[i];

      if (role) {
        if (!grid.body) {
          grid.body = new RelatiRole(grid, role.symbol);
          grid.body.status = { ...role.status };
        }
      } else delete grid.body;
    }
  }

  public componentDidUpdate() {
    if (!this.state.running) {
      this.cloneBoard();
      this.interrupt();
      this.recovery(this.props.turn);
    }
  }

  public componentWillUnmount() {
    this.unmounted = true;
  }

  public componentDidMount() {
    this.unmounted = false;
  }

  public render() {
    let focusedGrid = this.props.focus;

    let grids = this.board.grids.map((grid, key) => {
      let role = this.props.board.grids[key].body;
      let focus = focusedGrid && grid.x === focusedGrid.x && grid.y === focusedGrid.y;

      if (role) {
        if (!role.is("repeater") && grid.body) {
          grid.body.lost("repeater");
        }
      } else delete grid.body;

      return <Grid key={key} grid={grid} focus={focus as boolean} />;
    });

    let routes = this.state.routes.map((route, key) => (
      <Route key={key} grids={route} />
    ));

    return (
      <>
        <g className="effect-lines">{routes}</g>
        <g className="effect-grids">{grids}</g>
      </>
    );
  }
}
