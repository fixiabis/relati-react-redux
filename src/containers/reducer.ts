import pageReducer from "./page/reducer";
import arenaReducer from "./arena/reducer";
import { combineReducers } from "redux";

let reducer = combineReducers({
    pagePath: pageReducer,
    arena: arenaReducer
});

export default reducer;
