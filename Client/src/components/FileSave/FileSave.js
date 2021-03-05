import React from "react";

import "./FileSave.css";
import dateFormatter from "../Additions/dateFormatter.js";
import fileNameFormatter from "../Additions/fileNameFormatter.js";
import myInitObject from "../Additions/publicVar.js";


const FileSave = ({ message: { text, user, type, date }, name }) => {
  let isSentByCurrentUser = false;
  let baseUrl = `https://${myInitObject["accountName"]}.blob.core.windows.net/${myInitObject["container"]}`;
  const trimmedName = name.trim();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <div className="messageBox backgroundBlue">
        <a
          href={`${baseUrl}/${text}`}
        >
          <nobr>
            <p className="messageText colorWhite">
            <img src={process.env.PUBLIC_URL + "/file_white.svg"} alt="paperclip" className="file_my_img"/>
              {fileNameFormatter(text)}
            </p>
          </nobr>
        </a>
        <div className="date">
          <p className="timeText colorWhite">{dateFormatter(date)}</p>
        </div>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="sentText">{user}</p>
        <a
          href={`${baseUrl}/${text}`}
        >
          <nobr>
            <p className="messageText colorDark">
              <img src={process.env.PUBLIC_URL + "/file_black.svg"} alt="paperclip" className="file_my_img"/>
              {fileNameFormatter(text)}
            </p>
          </nobr>
        </a>
        <div className="date ">
          <p className="timeText protest">{dateFormatter(date)}</p>
        </div>
      </div>
    </div>
  );
};

export default FileSave;
