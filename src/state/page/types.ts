export type PagePath = "main" | "game" | "help";

export type ActionType = "SWITCH_PAGE";

export interface Action {
    type: ActionType;
    pagePath: PagePath;
}

export interface DispatchMapper {
    switchPageTo(pageName: PagePath): Action;
}
