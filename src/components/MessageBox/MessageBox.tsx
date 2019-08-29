import React from "react";
import { MessageBoxConfig } from "../MessageBox";
import "./message-box.scss";
import { MessageBoxState as State } from "../../containers/message-box";
import { connect } from "react-redux";
import mapDispatchToProps from "../../containers/message-box/action";

type MessageBoxProps = MessageBoxConfig & { hideMessageBox: () => void };

class MessageBox extends React.Component<MessageBoxProps> {
  public userResponse(result: boolean) {
    this.props.hideMessageBox();
    if (this.props.onUserResponse) this.props.onUserResponse(result);
  }

  public render() {
    if (this.props.show === false) return <></>;

    let controls;

    switch (this.props.type) {
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
          <div className={`message-icon ${this.props.icon}`} />
          <div className="message-text">{this.props.text}</div>
          {controls}
        </div>
      </div>
    );
  }
}

let mapStateToProps = ({ messageBox: {
  show, icon, type, text, onUserResponse
} }: State) => ({
  show, icon, type, text, onUserResponse
});

let connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(MessageBox);