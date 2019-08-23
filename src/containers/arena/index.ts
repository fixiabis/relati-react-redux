import { DispatchMapper, Action, ActionType, State } from "./types";

export type ArenaDispatchMapper = DispatchMapper;
export type ArenaActionType = ActionType;
export type ArenaAction = Action;
export type ArenaState = State;

export { default as reducer } from "./reducer";
export { default as dispatchMapper } from "./dispatchMapper";
