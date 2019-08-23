import { PageAction } from "./types";
import { PagePath as State } from "./types";

let defaultState: State = "main";

function reducer(state: State = defaultState, action: PageAction) {
    if (action.type === "SWITCH_PAGE") return action.pagePath;
    else return state;
}

export default reducer;
