import { RelatiGame, RelatiSymbol } from "../../game";

export type ActionType = (
    "ARENA_PLAYER_FOUND" |
    "ARENA_PLAYER_SELECT_GRID" |
    "ARENA_PLAYER_LEAVE"
);

export interface Action {
    type: ActionType;
}

export interface DispatchMapper {

}

export interface State {
    game: RelatiGame;
    playerSymbol: RelatiSymbol;
    opponentSocketId: string;
}
