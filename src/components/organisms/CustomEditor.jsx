import React, { useEffect } from 'react';
import {Editor, EditorState, RichUtils, AtomicBlockUtils } from 'draft-js';
import { Flex, Input } from '../../mixins';
import Toolbar from '../molecules/Toolbar';
import Image from '../atoms/Image';

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
  

  const  handleCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
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
  <Flex border="1px solid lightSlateGrey" borderRadius="5px" display="block" margin="20px">
    <Flex width="50%" margin="10px">
      <Toolbar handleCommand={handleCommand} handleOnFileInputChange={handleOnFileInputChange} />
    </Flex>
    <Flex width="100%" borderTop="1px solid" />
    <Flex position="relative" marginX="10px" marginBottom="10px" marginTop="5px" display="block">
      <Input
        id="fileInput"
        accept="image/png,image/jpeg,image/jpg,image/gif"
        onChange={handleOnFileInputChange}
        height="30px"
        width="100%"
        type="file"
        opacity="0%"
      />
      <Flex position="absolute">
        <Editor
          blockRendererFn={renderBlock}
          editorState={editorState}
          blockStyleFn={myBlockStyleFn}
          onChange={setEditorState}
        />
      </Flex>
    </Flex>
  </Flex>);
}

export default MyEditor;
