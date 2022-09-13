import React from "react";

const Image = ({ blockProps }) => {

  if (blockProps.src.file) {
    return (
      <img
        onClick={blockProps.handleOnClick}
        style={{
          width: "100%"
        }}
        src={blockProps.src.file}
        alt=""
      />
    );
  }
  return null;
};

export default Image;
