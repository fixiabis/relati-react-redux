import { PageActionType, PageAction, PageState, PageDispatchMapper, PageStateMappedToProps } from "./page";
import { ArenaActionType, ArenaAction, ArenaState, ArenaDispatchMapper, ArenaStateMappedToProps } from "./arena";

export type AppActionType = (
    PageActionType |
    ArenaActionType
);

export type AppAction = (
    PageAction |
    ArenaAction
);

export type AppDispatchMapper = (
    PageDispatchMapper &
    ArenaDispatchMapper
);

export type AppState = (
    PageState &
    ArenaState
);

export interface AppStateMapper {
    (state: AppState): AppStateMappedToProps;
}

export type AppStateMappedToProps = (
    PageStateMappedToProps &
    ArenaStateMappedToProps
);

export type AppProps = (
    AppStateMappedToProps &
    AppDispatchMapper
);
