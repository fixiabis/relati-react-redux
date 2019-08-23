import { ArenaDispatchMapper } from "./types";

let mapDispatchToProps: ArenaDispatchMapper = {
    playerFound: (socketId, symbol) => ({ type: "ARENA_PLAYER_FOUND", socketId, symbol }),
    playerSelectGrid: (grid) => ({ type: "ARENA_PLAYER_SELECT_GRID", grid }),
    playerLeave: () => ({ type: "ARENA_PLAYER_LEAVE" }),
    gameResult: (message) => ({ type: "ARENA_GAME_RESULT", message })
};

export default mapDispatchToProps;
