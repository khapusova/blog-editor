import React from "react";

const Link = ({contentState, entityKey, children}) => {
  const {url, linkText} = contentState.getEntity(entityKey).getData();

  return (
    <a href={url}>
      {linkText || children}
    </a>
  );
};

export default Link;
