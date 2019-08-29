import { AppDispatchMapper } from "./types";
import pageDispatchMapper from "./page/action";
import arenaDispatchMapper from "./arena/action";
import messageBoxDispatchMapper from "./message-box/action";

let mapDispatchToProps: AppDispatchMapper = {
    ...pageDispatchMapper,
    ...arenaDispatchMapper,
    ...messageBoxDispatchMapper
};

export default mapDispatchToProps;
