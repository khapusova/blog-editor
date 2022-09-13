import React, { useEffect } from 'react';
import {Editor, EditorState, RichUtils, AtomicBlockUtils } from 'draft-js';
import Button from './Button';
import Image from './Image';

const myBlockStyleFn = (contentBlock) => {
  const type = contentBlock.getType();
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
    const newState = RichUtils.handleKeyCommand(editorState, "bold");
    if (newState) {
      setEditorState(newState);
    };
  };
  const  handleCode = () => {
    const newState = RichUtils.handleKeyCommand(editorState, "code");
    if (newState) {
      setEditorState(newState);
    };
  };

  const renderBlock = (contentBlock) => {
    if (contentBlock?.getType() === "atomic") {
      const entityKey = contentBlock.getEntityAt(0);
      const entityData = editorState
        .getCurrentContent()
        .getEntity(entityKey)
        .getData();
      return {
        component: Image,
        editable: false,
        props: {
          src: { file: entityData.src },
          handleOnClick: () => {
            // maybe here can be removing
            console.log(contentBlock);
          }
        }
      };
    }
  };

  const handleOnFileInputChange = (event) => {
    const reader = new FileReader();
          reader.addEventListener(
            "load",
            () => {
              const contentStateWithEntity = editorState
                .getCurrentContent()
                .createEntity("IMAGE", "IMMUTABLE", { src: reader.result });
              setEditorState(
                AtomicBlockUtils.insertAtomicBlock(
                  EditorState.set(editorState, {
                    currentContent: contentStateWithEntity
                  }),
                  contentStateWithEntity.getLastCreatedEntityKey(),
                  " "
                )
              );
            },
            false
          );

          if (event.target?.files) {
            reader.readAsDataURL(event.target.files[0]);
          }
  };

  return (
  <div style={{width: "200px", border: "2px solid", display: "block", padding:"40px"}}>
    <input
        id="fileInput"
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/gif"
        onChange={handleOnFileInputChange}
      />
    <div style={{width: "100%", justifyContent: "space-between", display: "flex"}}>
    <Button handleOnClick={handleBold} content="B" />
    <Button handleOnClick={handleCode} content="<>" />
    </div>
    <div style={{width: "200px", border: "2px solid", }}>
      <Editor
        blockRendererFn={renderBlock}
        editorState={editorState}
        blockStyleFn={myBlockStyleFn}
        onChange={setEditorState}
      />
    </div>
  </div>);
}

export default MyEditor;
