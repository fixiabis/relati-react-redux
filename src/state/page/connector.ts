import dispatchMapper from "./dispatchMapper";
import stateMapper from "../shared/stateMapper";
import { State } from "../types";
import { connect } from "react-redux";

let connector = connect((state: State) => ({
    pagePath: stateMapper(state.pagePath)
}), dispatchMapper);

export default connector;
