import { RelatiGame, RelatiSymbol, RelatiGrid } from "../../modules/game";

export type ArenaActionType = (
    "ARENA_PLAYER_FOUND" |
    "ARENA_PLAYER_SELECT_GRID" |
    "ARENA_PLAYER_LEAVE"
);

export type ArenaAction = (
    ArenaPlayerFoundAction |
    ArenaPlayerSelectGridAction |
    ArenaPlayerLeaveAction
);

export interface ArenaPlayerFoundAction {
    type: "ARENA_PLAYER_FOUND";
    socketId: string;
    symbol: RelatiSymbol;
}

export interface ArenaPlayerSelectGridAction {
    type: "ARENA_PLAYER_SELECT_GRID";
    grid: RelatiGrid | null;
}

export interface ArenaPlayerLeaveAction {
    type: "ARENA_PLAYER_LEAVE";
}

export interface ArenaDispatchMapper {
    playerFound(socketId: string, symbol: RelatiSymbol): ArenaPlayerFoundAction;
    playerSelectGrid(grid: RelatiGrid | null): ArenaPlayerSelectGridAction;
    playerLeave(): ArenaPlayerLeaveAction;
}

export interface Arena {
    game: RelatiGame;
    playerSymbol: RelatiSymbol;
    opponentSocketId: string;
    lastCoor: { x: number, y: number } | null;
}

export interface ArenaState {
    arena: Arena;
}

export interface ArenaStateMapper {
    (state: ArenaState): ArenaStateMappedToProps;
}

export interface ArenaStateMappedToProps {
    arena: Arena;
}

export type ArenaProps = ArenaStateMappedToProps & ArenaDispatchMapper;
