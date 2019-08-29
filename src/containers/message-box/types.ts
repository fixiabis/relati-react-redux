export type MessageBoxActionType = (
    "SHOW" | "INFO" | "HINT" | "YORN" | "HIDE"
);

export type MessageBoxAction = (
    MessageBoxShowAction |
    MessageBoxHideAction
);

export interface MessageBoxShowAction {
    type: "SHOW" | "INFO" | "HINT" | "YORN";
    icon: string;
    text: string;
    callback?: (r: boolean) => void;
}

export interface MessageBoxHideAction {
    type: "HIDE";
}

export interface MessageBoxDispatchMapper {
    showMessageBox(
        type: "SHOW" | "INFO" | "HINT" | "YORN",
        icon: string,
        text: string,
        callback?: (r: boolean) => void
    ): MessageBoxShowAction;

    hideMessageBox(): MessageBoxHideAction;
}

export interface MessageBox {
    show: boolean;
    type: "info" | "hint" | "yorn";
    icon: string;
    text: string;
    onUserResponse?: (r: boolean) => void;
}

export interface MessageBoxState {
    messageBox: MessageBox;
}

export interface ArenaStateMapper {
    (state: MessageBoxState): MessageBoxStateMappedToProps;
}

export interface MessageBoxStateMappedToProps {
    messageBox: MessageBox;
}

export type MessageBoxProps = MessageBoxStateMappedToProps & MessageBoxDispatchMapper;
