import { ArenaAction, Arena as State } from "./types";
import { RelatiGame } from "../../modules/game";

let defaultState: State = {
    game: new RelatiGame(),
    playerSymbol: "",
    opponentSocketId: ""
};

function reducer(state: State = defaultState, action: ArenaAction) {
    switch (action.type) {
        case "ARENA_PLAYER_FOUND": return {
            ...state,
            opponentSocketId: action.socketId,
            playerSymbol: action.symbol
        };
        
        case "ARENA_PLAYER_LEAVE": return {
            ...state,
            opponentSocketId: "",
            playerSymbol: ""
        };

        case "ARENA_PLAYER_SELECT_GRID":
            state.game.onGridSelect(action.grid);

        default: return state;
    }
}

export default reducer;
