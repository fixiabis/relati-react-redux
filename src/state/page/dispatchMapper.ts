import { DispatchMapper } from "./types";

let mapDispatchToProps: DispatchMapper = {
    switchPageTo: (pagePath) => ({
        type: "SWITCH_PAGE", pagePath
    })
};

export default mapDispatchToProps;
