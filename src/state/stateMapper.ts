import { State, StateMapper } from "./types";
import sharedStateMapper from "./shared/stateMapper";

let mapStateToProps: StateMapper = (state: State) => ({
    pagePath: sharedStateMapper(state.pagePath)
});

export default mapStateToProps;
