import mapDispatchToProps from "./action";
import { PagePath } from "./types";
import { connect } from "react-redux";

interface State {
    pagePath: PagePath;
}

let mapStateToProps = ({ pagePath }: State) => ({ pagePath });

let connector = connect(mapStateToProps, mapDispatchToProps);

export default connector;
