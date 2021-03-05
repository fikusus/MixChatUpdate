import React, { Component } from "react";
import onlineIcon from "../../icons/onlineIcon.png";

import "./InfoBar.css";
class InfoBar extends Component {

test =(event) =>{
event.preventDefault();
 this.props.openModal();
}

  render() {
    return (
      <form className="infoBar">
        <div className="leftInnerContainer">
          <img className="onlineIcon" src={onlineIcon} alt="online icon" />
          <h3
            className="onlineBtnOpen"
            onClick={async (e) => {
              this.test(e);
            }}
            style={{ cursor: "pointer" }}
          >
            {this.props.room}  ({this.props.userscount})
          </h3>
        </div>
      </form>
    );
  }
}
export default InfoBar;
