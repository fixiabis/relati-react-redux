import { RelatiBoard, RelatiGrid, RelatiRouteType } from "./RelatiDefs";
import RelatiRole from "./RelatiRole";
import RelatiRouter from "./RelatiRouter";

export default class RelatiSignal {
    /** 路由器 */
    public router: RelatiRouter;

    constructor(
        public routeType: RelatiRouteType,
        public board: RelatiBoard
    ) { this.router = new RelatiRouter(routeType); }

    /** 中斷 */
    public interrupt() {
        for (let { body: role } of this.board.grids) {
            if (role) {
                role.lost("repeater");
            }
        }
    }

    /** 恢復 */
    public recovery() {
        for (let { body: role } of this.board.grids) {
            if (role && role.is("launcher")) {
                this.relati(role);
            }
        }
    }

    /** 連線擴展 */
    public relati(sourceRole: RelatiRole) {
        if (sourceRole.is("repeater")) return;
        sourceRole.gain("repeater");

        let routes: RelatiGrid[][] = this.router.getRoutes(
            sourceRole.grid, sourceRole.symbol, ["receiver"]
        );

        for (let [{ body: targetRole }] of routes) {
            if (targetRole) this.relati(targetRole);
        }
    }
}
