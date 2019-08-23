import dispatchMapper from "./dispatchMapper";
import stateMapper from "./stateMapper";
import { connect } from "react-redux";

let connector = connect(stateMapper, dispatchMapper);

export default connector;
