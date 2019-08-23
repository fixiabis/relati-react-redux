import { RelatiGrid, RelatiStatus, RelatiSymbol } from "./RelatiDefs";

export default class RelatiRole {
    /** 狀態存儲 */
    public status: { [status: string]: boolean } = {};

    constructor(
        /** 所在棋盤格 */
        public grid: RelatiGrid,
        /** 符號 */
        public symbol: RelatiSymbol
    ) { }

    /**
     * 判斷是否符合狀態
     * @param statusName 狀態名稱
     */
    public is(statusName: RelatiStatus): boolean;

    /**
     * 判斷是否符合所有狀態或任一狀態
     * @param statusNameList 狀態名稱列表
     * @param matchType 所有狀態 | 任一狀態
     */
    public is(statusNameList: RelatiStatus[], matchType: "all" | "any"): boolean;

    public is(statusName: RelatiStatus | RelatiStatus[], matchType?: "all" | "any") {
        if (typeof statusName === "string") return this.status[statusName];

        let statusNameList = statusName;

        if (matchType === "all") {
            for (let status of statusNameList) {
                if (!this.status[status]) return false;
            }

            return true;
        } else {
            for (let status of statusNameList) {
                if (this.status[status]) return true;
            }

            return false;
        }
    }

    /**
     * 獲得狀態
     * @param status 狀態名稱
     */
    public gain(status: RelatiStatus): void;

    /**
     * 獲得多個狀態
     * @param statusNameList 狀態名稱列表
     */
    public gain(statusNameList: RelatiStatus[]): void;

    public gain(statusName: RelatiStatus | RelatiStatus[]) {
        if (typeof statusName === "string") {
            return this.status[statusName] = true;
        }

        let statusNameList = statusName;

        for (let status of statusNameList) {
            this.status[status] = true;
        }
    }

    /**
     * 失去狀態
     * @param status 狀態名稱
     */
    public lost(status: RelatiStatus): void;

    /**
     * 失去多個狀態
     * @param statusNameList 狀態名稱列表
     */
    public lost(statusNameList: RelatiStatus[]): void;

    public lost(statusName: RelatiStatus | RelatiStatus[]) {
        if (typeof statusName === "string") {
            return this.status[statusName] = false;
        }

        let statusNameList = statusName;

        for (let status of statusNameList) {
            this.status[status] = false;
        }
    }
}
