import pageReducer from "./page/reducer";
import { combineReducers } from "redux";

let reducer = combineReducers({
    pagePath: pageReducer
});

export default reducer;
