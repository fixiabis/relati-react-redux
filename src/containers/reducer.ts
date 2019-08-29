import { PagePath } from "./page";
import { Arena } from "./arena";
import { MessageBox } from "./message-box";

import pageReducer from "./page/reducer";
import arenaReducer from "./arena/reducer";
import messageBoxReducer from "./message-box/reducer";

import { combineReducers, Reducer, AnyAction } from "redux";

let reducer = combineReducers({
    pagePath: pageReducer as Reducer<PagePath, AnyAction>,
    arena: arenaReducer as Reducer<Arena, AnyAction>,
    messageBox: messageBoxReducer as Reducer<MessageBox, AnyAction>
});

export default reducer;
