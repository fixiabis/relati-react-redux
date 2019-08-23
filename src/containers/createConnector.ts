import { connect } from "react-redux";

function createConnector<State, Mapper>(propNames: (keyof State)[], dispatchMapper: Mapper) {
    return connect((state: State) => propNames.reduce(
        (props, propName) => (props[propName] = state[propName], props),
        {} as { [N in keyof State]: State[N] }
    ), dispatchMapper);
}

export default createConnector;
