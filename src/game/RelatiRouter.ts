import { GridDirection } from "./GridBoard";
import { RelatiGrid, RelatiRouteType, RelatiStatus, RelatiSymbol } from "./RelatiDefs";

let {
    F, B, R, L, FR, FL, BR, BL,
    FF, BB, RR, LL, FFRR, FFLL, BBRR, BBLL,
    FFR, FFL, BBR, BBL, FRR, FLL, BRR, BLL
} = GridDirection;

/** 一般連線路徑 */
const NORMAL_ROUTES = [F, B, R, L, FR, FL, BR, BL];

/** 遠程連線路徑 */
const REMOTE_NORMAL_ROUTES = [
    [FF, F],
    [BB, B],
    [RR, R],
    [LL, L],
    [FFRR, FR],
    [FFLL, FL],
    [BBRR, BR],
    [BBLL, BL]
];

/** 遠程穩定連線路徑 */
const REMOTE_STABLE_ROUTES = [
    [FFR, FF, F],
    [FFR, FR, F],
    [FFR, FR, R],
    [FFL, FF, F],
    [FFL, FL, F],
    [FFL, FL, L],
    [BBR, BB, B],
    [BBR, BR, B],
    [BBR, BR, R],
    [BBL, BB, B],
    [BBL, BL, B],
    [BBL, BL, L],
    [FRR, FR, F],
    [FRR, RR, R],
    [FRR, FR, R],
    [FLL, FL, F],
    [FLL, LL, L],
    [FLL, FL, L],
    [BRR, BR, B],
    [BRR, RR, R],
    [BRR, BR, R],
    [BLL, BL, B],
    [BLL, LL, L],
    [BLL, BL, L]
];

export default class RelatiRouter {
    constructor(public routeType: RelatiRouteType) { }

    /**
     * 判斷連線路徑是否存在
     * @param sourceGrid 來源棋盤格
     * @param symbol 對應符號
     * @param statusList 狀態參考
     * @return 是否存在路徑
     */
    public hasRoute(sourceGrid: RelatiGrid, symbol: RelatiSymbol, statusList: RelatiStatus[]) {
        if (this.routeType === "common") {
            for (let i = 0; i < 24; i++) {
                let targetGrid = sourceGrid.getGrid(REMOTE_STABLE_ROUTES[i][0]);
                let middleGrid1 = sourceGrid.getGrid(REMOTE_STABLE_ROUTES[i][1]) as RelatiGrid;
                let middleGrid2 = sourceGrid.getGrid(REMOTE_STABLE_ROUTES[i][2]) as RelatiGrid;

                if (
                    targetGrid &&
                    targetGrid.body &&
                    targetGrid.body.symbol === symbol &&
                    targetGrid.body.is(statusList, "any") &&
                    !middleGrid1.body &&
                    !middleGrid2.body
                ) return true;
            }

            for (let i = 0; i < 8; i++) {
                let targetGrid = sourceGrid.getGrid(REMOTE_NORMAL_ROUTES[i][0]);
                let middleGrid = sourceGrid.getGrid(REMOTE_NORMAL_ROUTES[i][1]) as RelatiGrid;

                if (
                    targetGrid &&
                    targetGrid.body &&
                    targetGrid.body.symbol === symbol &&
                    targetGrid.body.is(statusList, "any") &&
                    !middleGrid.body
                ) return true;
            }
        }

        for (let i = 0; i < 8; i++) {
            let targetGrid = sourceGrid.getGrid(NORMAL_ROUTES[i]);

            if (
                targetGrid &&
                targetGrid.body &&
                targetGrid.body.symbol === symbol &&
                targetGrid.body.is(statusList, "any")
            ) return true;
        }

        return false;
    }

    /**
     * 取得連線路徑
     * @param sourceGrid 來源棋盤格
     * @param symbol 對應符號
     * @param statusList 狀態參考
     * @return 所有存在路徑
     */
    public getRoutes(sourceGrid: RelatiGrid, symbol: RelatiSymbol, statusList: RelatiStatus[]) {
        let routes: RelatiGrid[][] = [];

        if (this.routeType === "common") {
            for (let i = 0; i < 24; i++) {
                let targetGrid = sourceGrid.getGrid(REMOTE_STABLE_ROUTES[i][0]);
                let middleGrid1 = sourceGrid.getGrid(REMOTE_STABLE_ROUTES[i][1]) as RelatiGrid;
                let middleGrid2 = sourceGrid.getGrid(REMOTE_STABLE_ROUTES[i][2]) as RelatiGrid;

                if (
                    targetGrid &&
                    targetGrid.body &&
                    targetGrid.body.symbol === symbol &&
                    targetGrid.body.is(statusList, "any") &&
                    !middleGrid1.body &&
                    !middleGrid2.body
                ) routes.push([targetGrid, middleGrid1, middleGrid2]);
            }

            for (let i = 0; i < 8; i++) {
                let targetGrid = sourceGrid.getGrid(REMOTE_NORMAL_ROUTES[i][0]);
                let middleGrid = sourceGrid.getGrid(REMOTE_NORMAL_ROUTES[i][1]) as RelatiGrid;

                if (
                    targetGrid &&
                    targetGrid.body &&
                    targetGrid.body.symbol === symbol &&
                    targetGrid.body.is(statusList, "any") &&
                    !middleGrid.body
                ) routes.push([targetGrid, middleGrid]);
            }
        }

        for (let i = 0; i < 8; i++) {
            let targetGrid = sourceGrid.getGrid(NORMAL_ROUTES[i]);

            if (
                targetGrid &&
                targetGrid.body &&
                targetGrid.body.symbol === symbol &&
                targetGrid.body.is(statusList, "any")
            ) routes.push([targetGrid]);
        }

        return routes;
    }
}
