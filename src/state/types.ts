import { PagePath, PageActionType, PageDispatchMapper } from "./page";

export type ActionType = PageActionType;

export interface Action {
    type: ActionType;
    pagePath: PagePath;
}

export type DispatchMapper = PageDispatchMapper;

export interface State {
    pagePath: PagePath;
}

export interface StateMapper {
    (state: State): StateMappedToProps;
}

export interface StateMappedToProps {
    pagePath: PagePath
}

export type AppProps = StateMappedToProps & DispatchMapper;
