import React from "react";

import "./Message.css";
import dateFormatter from "../../Additions/dateFormatter.js";
import ReactHtmlParser from 'react-html-parser';

const Message = ({ message: { text, user, type, date }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  const findUrl = (textToFind) => {
    var urlRegex = /((?:(?:https?|ftp|gopher|telnet|file|notes|ms-help):(?:\/\/|\\\\)(?:www\.)?|www\.)[\w\d:#@%/;$()~_?+,\-=\\.&]+)/gi;

    let out = textToFind.replace(urlRegex, function (url) {
      let old = url;
      let out = url.replace("https",'');
      out = url.replace("http",'');
      out = url.replace("www",'//www');
      return '<a class="lightBlueLink" href="' + out + '" target="_blank">' + old + '</a>';
    });


    return ReactHtmlParser(out);
  };

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <div className="messageBox backgroundBlue">
        <p className="messageText current colorWhite">
        {findUrl(text)}
        </p>
        <div className="date">
          <p className="timeText colorWhite">{dateFormatter(date)}</p>
        </div>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="sentText">{user}</p>
        <p className="messageText  colorDark">{findUrl(text)}</p>
        <div className="date ">
          <p className="timeText protest">{dateFormatter(date)}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
