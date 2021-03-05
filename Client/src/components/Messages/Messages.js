import React from "react";

import ScrollToBottom from "react-scroll-to-bottom";

import Message from "./Message/Message";
import FileSave from "./../FileSave/FileSave";
import ImageShower from "./../ImageShower/ImageShower";

import "./Messages.css";

const Messages = ({ messages, name, loadOld, socket}) => {
  const addBtn = () => {
    if (loadOld === 0) {
      return null;
    } else {
      return (
        <div
          className="loadOldMessageBtn"
          onClick={async (e) => {
            socket.emit("load-old", loadOld);
          }}
        >
          <p className="loadText">Load early messages</p>
        </div>
      );
    }
  };
  return (
    <ScrollToBottom className="messages">
      {addBtn()}
      {messages.map((message, i) => {
        let text;
        switch (message.type) {
          case "text":
            if (i === 0) {
              text = (
                <div key={i}>
                  <br></br>
                  {<Message message={message} name={name} />}
                </div>
              );
            } else {
              text = (
                <div key={i}>{<Message message={message} name={name} />}</div>
              );
            }
            break;
          case "file":
            if (i === 0) {
              text = (
                <div key={i}>
                  <br></br>
                  {<FileSave message={message} name={name} />}
                </div>
              );
            } else {
              text = (
                <div key={i}>{<FileSave message={message} name={name} />}</div>
              );
            }
            break;
          case "image":
            if (i === 0) {
              text = (
                <div key={i}>
                  <br></br>
                  {<ImageShower message={message} name={name} />}
                </div>
              );
            } else {
              text = (
                <div key={i}>
                  {<ImageShower message={message} name={name} />}
                </div>
              );
            }
            break;
            default:
              break;
        }
        return text;
      })}
    </ScrollToBottom>
  );
};
export default Messages;
