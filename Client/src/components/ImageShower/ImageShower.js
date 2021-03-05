import React from "react";

import "./ImageShower.css";
import dateFormatter from "../Additions/dateFormatter.js"
import fileNameFormatter from "../Additions/fileNameFormatter.js"
import myInitObject from "../Additions/publicVar.js";
// eslint-disable-next-line react/prop-types
const ImageShower = ({ message: { text, user ,type,date}, name }) => {

  let isSentByCurrentUser = false;
  let baseUrl = `https://${myInitObject["accountName"]}.blob.core.windows.net/${myInitObject["container"]}`;
  // eslint-disable-next-line react/prop-types
  const trimmedName = name.trim()

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <div className="messageBox backgroundBlue imageBox">
        <a href={`${baseUrl}/${text}`}>
          <img className="imagePreview"  src = {`${baseUrl}/${text}` } alt={fileNameFormatter(text)} target="_blank"></img>
          </a>
          <div className = "date absoluteImage">
          <p className = "timeText colorWhite">{dateFormatter(date)}</p>
        </div>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight imageBox">
      <p className="sentText">{user}</p>
        <a href={`${baseUrl}/${text}`}>
        <img className="imagePreview"  src = {`${baseUrl}/${text}` } alt={fileNameFormatter(text)} target="_blank"></img>
        </a>
        <div className = "date protestImageDate">
          <p className = "timeText protest">{dateFormatter(date)}</p>
        </div>

      </div>
   
    </div>
  );
};

export default ImageShower;
