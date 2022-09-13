import React from "react";

const Button = ({content, handleOnClick}) => <button style={{ border: "2px solid", display: "block", padding:"10px", borderRadius: "4px"}} onClick={handleOnClick}>{content}</button>;

export default Button;
