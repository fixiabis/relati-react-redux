import { RelatiGame, RelatiSymbol, RelatiGrid } from "../../game";

export type ArenaActionType = (
    "ARENA_PLAYER_FOUND" |
    "ARENA_PLAYER_SELECT_GRID" |
    "ARENA_PLAYER_LEAVE" |
    "ARENA_GAME_RESULT"
);

export type ArenaAction = (
    ArenaPlayerFoundAction |
    ArenaPlayerSelectGridAction |
    ArenaPlayerLeaveAction |
    ArenaGameResultAction
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

export interface ArenaGameResultAction {
    type: "ARENA_GAME_RESULT";
    message: string;
}

export interface ArenaDispatchMapper {
    playerFound(socketId: string, symbol: RelatiSymbol): ArenaPlayerFoundAction;
    playerSelectGrid(grid: RelatiGrid | null): ArenaPlayerSelectGridAction;
    playerLeave(): ArenaPlayerLeaveAction;
    gameResult(message: string): ArenaGameResultAction;
}

export interface Arena {
    game: RelatiGame;
    playerSymbol: RelatiSymbol;
    opponentSocketId: string;
    gameResultMessage: string;
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
