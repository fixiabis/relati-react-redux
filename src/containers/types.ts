import { PageActionType, PageAction, PageState, PageDispatchMapper } from "./page";
import { ArenaActionType, ArenaAction, ArenaState, ArenaDispatchMapper } from "./arena";

export type AppActionType = PageActionType | ArenaActionType;

export type AppAction = PageAction | ArenaAction;

export type AppDispatchMapper = PageDispatchMapper & ArenaDispatchMapper;

export interface AppState {
    pagePath: PageState;
    arena: ArenaState;
}

export interface AppStateMapper {
    (state: AppState): AppStateMappedToProps;
}

export interface AppStateMappedToProps {
    pagePath: PageState;
    arena: ArenaState;
}

export type AppProps = AppStateMappedToProps & AppDispatchMapper;
