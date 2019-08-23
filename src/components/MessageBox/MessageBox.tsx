import React from "react";
import { MessageBoxConfig } from "../MessageBox";
import "./message-box.scss";

type MessageBoxProps = MessageBoxConfig;
type MessageBoxState = MessageBoxConfig & { initiative?: boolean };

export default class MessageBox extends React.Component<MessageBoxProps, MessageBoxState> {
  public static getDerivedStateFromProps(props: MessageBoxProps, state: MessageBoxState) {
    if (state.initiative) {
      delete state.initiative;
      return state;
    } else return { ...props };
  }

  constructor(props: MessageBoxProps) {
    super(props);
    this.state = { ...props };
  }

  public userResponse(result: boolean) {
    this.setState({ show: false, initiative: true });
    if (this.props.onUserResponse) this.props.onUserResponse(result);
  }

  public render() {
    if (this.state.show === false) return <></>;

    let controls;

    switch (this.state.type) {
      case "yorn":
        controls = (
          <div className="button-group">
            <button className="accept" onClick={e => this.userResponse(true)} />
            <button className="reject" onClick={e => this.userResponse(false)} />
          </div>
        );

        break;

      case "hint":
        controls = (
          <div className="button-group">
            <button className="verify" onClick={e => this.userResponse(true)} />
          </div>
        );

        break;
    }

    return (
      <div className="message-box-container">
        <div className="message-box">
          <div className={`message-icon ${this.state.icon}`} />
          <div className="message-text">{this.state.text}</div>
          {controls}
        </div>
      </div>
    );
  }
}
