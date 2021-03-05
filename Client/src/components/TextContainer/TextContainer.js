import React from "react";
import onlineIcon from "../../icons/onlineIcon.png";

import "./TextContainer.css";

const TextContainer = ({ users, closeModal }) => {
  return (
    <div className="textContainer">
      <img
        src={process.env.PUBLIC_URL + "/clear.svg"}
        alt="cross"
        className="closeModalWin"
        onClick={async (e) => {
          closeModal();
        }}
        style={{ cursor: "pointer" }}
      />
      {users ? (
        <div>
          <h1>Онлайн:</h1>
          <div className="activeContainer">
            <h2>
              {users.map(({ name }) => (
                <div key={name} className="activeItem">
                  <img alt="Online Icon" src={onlineIcon} />
                  {name}
                </div>
              ))}
            </h2>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default TextContainer;
