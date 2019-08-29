import { PageActionType, PageAction, PageState, PageDispatchMapper, PageStateMappedToProps } from "./page";
import { ArenaActionType, ArenaAction, ArenaState, ArenaDispatchMapper, ArenaStateMappedToProps } from "./arena";
import { MessageBoxActionType, MessageBoxAction, MessageBoxState, MessageBoxDispatchMapper, MessageBoxStateMappedToProps } from "./message-box";

export type AppActionType = (
    PageActionType |
    ArenaActionType |
    MessageBoxActionType
);

export type AppAction = (
    PageAction |
    ArenaAction |
    MessageBoxAction
);

export type AppDispatchMapper = (
    PageDispatchMapper &
    ArenaDispatchMapper &
    MessageBoxDispatchMapper
);

export type AppState = (
    PageState &
    ArenaState &
    MessageBoxState
);

export interface AppStateMapper {
    (state: AppState): AppStateMappedToProps;
}

export type AppStateMappedToProps = (
    PageStateMappedToProps &
    ArenaStateMappedToProps &
    MessageBoxStateMappedToProps
);

export type AppProps = AppStateMappedToProps & AppDispatchMapper;
