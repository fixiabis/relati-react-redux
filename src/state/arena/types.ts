import { RelatiGame, RelatiSymbol, RelatiGrid } from "../../game";

export type ActionType = (
    "ARENA_PLAYER_FOUND" |
    "ARENA_PLAYER_SELECT_GRID" |
    "ARENA_PLAYER_LEAVE" |
    "ARENA_GAME_RESULT"
);

export type Action = (
    PlayerFoundAction |
    PlayerSelectGridAction |
    PlayerLeaveAction |
    GameResultAction
);

export interface PlayerFoundAction {
    type: "ARENA_PLAYER_FOUND";
    socketId: string;
    symbol: string;
}

export interface PlayerSelectGridAction {
    type: "ARENA_PLAYER_SELECT_GRID";
    grid: RelatiGrid | null;
}

export interface PlayerLeaveAction {
    type: "ARENA_PLAYER_LEAVE";
}

export interface GameResultAction {
    type: "ARENA_GAME_RESULT";
    message: string;
}

export interface DispatchMapper {
    playerFound(socketId: string, symbol: RelatiSymbol): PlayerFoundAction;
    playerSelectGrid(grid: RelatiGrid | null): PlayerSelectGridAction;
    playerLeave(): PlayerLeaveAction;
    gameResult(message: string): GameResultAction;
}

export interface State {
    game: RelatiGame;
    playerSymbol: RelatiSymbol;
    opponentSocketId: string;
    gameResultMessage: string;
}
