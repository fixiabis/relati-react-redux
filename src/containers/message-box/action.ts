import { MessageBoxDispatchMapper } from "./types";

let mapDispatchToProps: MessageBoxDispatchMapper = {
    showMessageBox: (type, icon, text, callback) => ({ type, icon, text, callback }),
    hideMessageBox: () => ({ type: "HIDE" })
};

export default mapDispatchToProps;
