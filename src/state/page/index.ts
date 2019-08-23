import { PagePath, DispatchMapper, Action, ActionType } from "./types";

export type PagePath = PagePath;
export type PageDispatchMapper = DispatchMapper;
export type PageActionType = ActionType;
export type PageAction = Action;

export { default as reducer } from "./reducer";
export { default as connector } from "./connector";
export { default as dispatchMapper } from "./dispatchMapper";
