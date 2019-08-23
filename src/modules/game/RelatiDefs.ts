import { Grid, GridBoard } from "./GridBoard";
import RelatiRole from "./RelatiRole";

/** 遊戲棋盤 */
export type RelatiBoard = GridBoard<RelatiRole>;

/** 遊戲棋盤格 */
export type RelatiGrid = Grid<RelatiRole>;

/** 遊戲連線類型 */
export type RelatiRouteType = "normal" | "common";

/** 遊戲符號 */
export type RelatiSymbol = "" | "O" | "X" | "D" | "R" | "A";

/** 遊戲符號狀態 */
export type RelatiStatus = "launcher" | "repeater" | "receiver";
