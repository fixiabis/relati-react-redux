import { PagePath, DispatchMapper } from "./types";

let mapDispatchToProps: DispatchMapper = {
    switchPageTo: (pagePath: PagePath) => ({
        type: "SWITCH_PAGE", pagePath
    })
};

export default mapDispatchToProps;
