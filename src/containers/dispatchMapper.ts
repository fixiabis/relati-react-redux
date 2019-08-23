import { DispatchMapper } from "./types";
import pageDispatchMapper from "./page/dispatchMapper";
import arenaDispatchMapper from "./arena/dispatchMapper";

let mapDispatchToProps: DispatchMapper = {
    ...pageDispatchMapper,
    ...arenaDispatchMapper
};

export default mapDispatchToProps;
