import mapDispatchToProps from "./action";
import { AppStateMapper } from "./types";
import { connect } from "react-redux";

let mapStateToProps: AppStateMapper = state => state;
let connector = connect(mapStateToProps, mapDispatchToProps);

export default connector;
