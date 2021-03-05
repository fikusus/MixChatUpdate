import React, { Component } from "react";
import { BlobServiceClient } from "@azure/storage-blob";
import "./Input.css";
import myInitObject from "../Additions/publicVar.js";
var fileInLoadKey = false;
class Input extends Component {
  async uploadFile(file) {
    const SAS_TOKEN =
      "?sv=2019-12-12&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-11-30T16:28:17Z&st=2020-11-30T08:28:17Z&spr=https,http&sig=4ArE7Cljg1Kz%2BL%2BVjbTn9%2FHocXhdOqaqgfRtgh6lehk%3D";
    const sasURL = `https://${myInitObject["accountName"]}.blob.core.windows.net/${ myInitObject["sastoken"]}`;

    const blobServiceClient = new BlobServiceClient(sasURL);

    const containerClient = blobServiceClient.getContainerClient(
      myInitObject["container"]
    );

    const filename = file.name.substring(0, file.name.lastIndexOf("."));
    const ext = file.name.substring(file.name.lastIndexOf("."));
    const blobName = filename + "_" + new Date().getTime() + ext;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    fileInLoadKey = true;
    let type = file.type;
    await blockBlobClient.uploadData(file);

    fileInLoadKey = false;
    if (
      type === "image/png" ||
      type === "image/gif" ||
      type === "image/jpeg" ||
      type === "image/webp" 
    ) {
      this.props.setMessageType("image");
    } else {
      this.props.setMessageType("file");
    }

    this.props.setFileName(blobName);
    this.props.sendFile();
    this.props.setMessageType("text");
    let inputs = document.querySelector(".inputFile");
    inputs.value = "";
    if (inputs.value) {
      inputs.type = "text";
      inputs.type = "file";
    }
    this.props.setSelectedFile(null);
    this.props.setLoaded(0);
  }

  sendMessageFunction = async (e) => {
    console.log(myInitObject);
    let inputField = document.getElementsByClassName("input");
    this.props.setMessageType("text");
    inputField[0].focus();
    this.props.setMessage("");
    this.props.sendMessage(e);
  };

  onChangeHandler = async (event) => {
    this.formatingFile(event.target.files);
  };

  formatingFile = async (files) => {
    if (!fileInLoadKey) {
      if (files[0].size > 52428800) {
        alert("Файл занадто великий(max 50mb)");
      } else {
        this.props.setSelectedFile(files);
        this.uploadFile(files[0]);
      }
    } else {
      alert("Дочекайся завантаження попереднього файлу");
    }
  };

  onKeyboardPressed = (event) => {
    var items = (event.clipboardData || event.originalEvent.clipboardData)
      .items;
    for (let index in items) {
      var item = items[index];
      if (item.kind === "file") {
        var blob = item.getAsFile();

        let blobs = [blob];
        this.formatingFile(blobs);
      }
    }
  };

  render() {
    return (
      <form className="form">
        <textarea
          className="input"
          type="text"
          placeholder="Type a message..."
          value={this.props.message}
          onKeyPress={(event) =>
            event.key === "Enter" ? this.sendMessageFunction(event) : null
          }
          onChange={({ target: { value } }) => this.props.setMessage(value)}
          onPaste={(e) => this.onKeyboardPressed(e)}
        />
        <input
          type="file"
          hidden="hidden"
          className="inputFile"
          onChange={this.onChangeHandler}
        ></input>
        <img
          src={process.env.PUBLIC_URL + "/attachment.svg"}
          alt="paperclip"
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            const inputFile = document.querySelector(".inputFile");
            inputFile.click();
          }}
          className="paperClipButton"
        />

        <img
          src={process.env.PUBLIC_URL + "/send.svg"}
          alt="send"
          style={{ cursor: "pointer" }}
          className="sendButton"
          onClick={async (e) => {
            this.sendMessageFunction(e);
          }}
        ></img>
      </form>
    );
  }
}

export default Input;
