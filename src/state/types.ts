import { PageAction, PageActionType, PageDispatchMapper, PageState } from "./page";
import { ArenaActionType, ArenaState, ArenaDispatchMapper } from "./arena";

export type ActionType = PageActionType | ArenaActionType;

export type Action = PageAction;

export type DispatchMapper = PageDispatchMapper & ArenaDispatchMapper;

export interface State {
    pagePath: PageState;
    arena: ArenaState;
}

export interface StateMapper {
    (state: State): StateMappedToProps;
}

export interface StateMappedToProps {
    pagePath: PageState;
    arena: ArenaState;
}

export type AppProps = StateMappedToProps & DispatchMapper;
