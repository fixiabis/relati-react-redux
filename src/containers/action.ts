import { AppDispatchMapper } from "./types";
import pageDispatchMapper from "./page/action";
import arenaDispatchMapper from "./arena/action";

let mapDispatchToProps: AppDispatchMapper = {
    ...pageDispatchMapper,
    ...arenaDispatchMapper
};

export default mapDispatchToProps;
