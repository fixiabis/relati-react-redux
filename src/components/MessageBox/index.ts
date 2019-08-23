export { default as MessageBox } from "./MessageBox";

export interface MessageBoxConfig {
    show: boolean;
    icon?: string;
    text?: string;
    type?: "info" | "hint" | "yorn";
    onUserResponse?: (result: boolean) => void;
}
