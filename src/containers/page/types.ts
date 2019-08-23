export type PagePath = "main" | "game" | "help";

export type PageActionType = "SWITCH_PAGE";

export interface PageAction {
    type: PageActionType;
    pagePath: PagePath;
}

export interface PageDispatchMapper {
    switchPageTo(pageName: PagePath): PageAction;
}

export interface PageState {
    pagePath: PagePath;
}

export interface PageStateMapper {
    (state: PageState): PageStateMappedToProps;
}

export interface PageStateMappedToProps {
    pagePath: PagePath;
}

export type PageProps = PageStateMappedToProps & PageDispatchMapper;
