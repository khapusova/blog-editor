import React from "react";

const Image = ({ blockProps }) => {

  if (blockProps.src.file) {
    return (
      <figure>
        <img
          onClick={blockProps.handleOnClick}
          style={{
            width: "100%"
          }}
          src={blockProps.src.file}
          alt=""
        />
      </figure>
    );
  }
  return null;
};

export default Image;
