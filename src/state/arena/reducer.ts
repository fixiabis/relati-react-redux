import { Action, State } from "./types";
import { RelatiGame } from "../../game";

let defaultState: State = {
    game: new RelatiGame(),
    playerSymbol: "",
    opponentSocketId: "",
    gameResultMessage: ""
};

function reducer(state: State = defaultState, action: Action) {
    switch (action.type) {
        case "ARENA_PLAYER_FOUND": return {
            ...state,
            opponentSocketId: action.socketId,
            playerSymbol: action.symbol
        };

        case "ARENA_GAME_RESULT": return {
            ...state,
            gameResultMessage: action.message
        };

        case "ARENA_PLAYER_SELECT_GRID":
            state.game.onGridSelect(action.grid);

        case "ARENA_PLAYER_LEAVE":
        default: return state;
    }
}

export default reducer;
