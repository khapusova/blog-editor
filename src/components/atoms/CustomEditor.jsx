import React, { useEffect } from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js';
import Button from './Button';

function myBlockStyleFn(contentBlock) {
  const type = contentBlock.getType();
  console.log(type);
  if (type === 'code-block') {
    return 'superFancyBlockquote';
  }
}


const MyEditor = () => {
  const [editorState, setEditorState] = React.useState(
    () => EditorState.createEmpty(),
  );
  useEffect(() => {
    if (document?.querySelector(".superFancyBlockquote")?.parentElement) {
    document.querySelector(".superFancyBlockquote").parentElement.className="superFancy";
  }
  });
  
  const  handleBold = () => {
    console.log(editorState);
    const newState = RichUtils.handleKeyCommand(editorState, "bold");
    if (newState) {
      setEditorState(newState);
    };
  };

  const  handleCode = () => {
    console.log(editorState);
    const newState = RichUtils.handleKeyCommand(editorState, "code");
    if (newState) {
      setEditorState(newState);
    };
  };


  return (
  <div style={{width: "200px", border: "2px solid", display: "block", padding:"40px"}}>
    <div style={{width: "100%", justifyContent: "space-between", display: "flex"}}>
    <Button handleOnClick={handleBold} content="B" />
    <Button handleOnClick={handleCode} content="<>" />
    </div>
    <div style={{width: "200px", border: "2px solid", }}><Editor editorState={editorState} blockStyleFn={myBlockStyleFn} onChange={setEditorState} /></div>
  </div>);
}

export default MyEditor;
