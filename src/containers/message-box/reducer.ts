import { MessageBoxAction, MessageBox as State } from "./types";

let defaultState: State = {
    icon: "",
    type: "hint",
    show: false,
    text: ""
};

function reducer(state: State = defaultState, action: MessageBoxAction) {
    let actionType: "info" | "hint" | "yorn";

    switch (action.type) {
        case "SHOW":
            actionType = "info";
            break;
        case "INFO":
        case "YORN":
        case "HINT":
            actionType = action.type.toLowerCase() as "info" | "hint" | "yorn";
            break;

        case "HIDE":
        default:
            return { ...state, show: false };
    }

    return {
        ...state,
        show: true,
        type: actionType,
        text: action.text,
        icon: action.icon,
        onUserResponse: action.callback
    };
}

export default reducer;
