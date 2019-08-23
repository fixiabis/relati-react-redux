import { DispatchMapper } from "./types";
import pageDispatchMapper from "./page/dispatchMapper";

let mapDispatchToProps: DispatchMapper = {
    ...pageDispatchMapper
};

export default mapDispatchToProps;
