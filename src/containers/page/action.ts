import { PageDispatchMapper } from "./types";

let mapDispatchToProps: PageDispatchMapper = {
    switchPageTo: (pagePath) => ({
        type: "SWITCH_PAGE", pagePath
    })
};

export default mapDispatchToProps;
