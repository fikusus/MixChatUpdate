import React from "react";

import "./FileSpawn.css";

// eslint-disable-next-line react/prop-types
const FileSpawn = ({ selectedFile }) => {
  const filesArray = [...selectedFile];

  return (
    <div>
      <div className="outerFileContainer">
        <div className="innerFileContainer">
          {filesArray.map((f) => (
            <div key={f.lastModified} className="fileName">
              <p key={f.lastModified + new Date()}>{f.name}</p>
              <div id="cancelFileSelect">
              <img src={process.env.PUBLIC_URL + "/load.gif"} alt="loading" className = "loading_image"/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileSpawn;
