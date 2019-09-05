import { ArenaAction, Arena as State } from "./types";
import { RelatiGame } from "../../modules/game";

let defaultState: State = {
    game: new RelatiGame(),
    playerSymbol: "",
    opponentSocketId: "",
    lastCoor: null
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

            let lastCoor = null;

            if (action.grid) lastCoor = {
                x: action.grid.x,
                y: action.grid.y
            };

            return {
                ...state,
                lastCoor
            };

        default: return state;
    }
}

export default reducer;
