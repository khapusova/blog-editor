import React, { useEffect, useState } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  AtomicBlockUtils,
  CompositeDecorator,
  Modifier
} from 'draft-js';
import { Flex, Input } from '../../mixins';
import Toolbar from '../molecules/Toolbar';
import Image from '../atoms/Image';
import Link from '../atoms/Link';

const myBlockStyleFn = (contentBlock) => {
  const type = contentBlock.getType();
  if (type === 'code-block') {
    return 'superFancyBlockquote';
  }
}

const MyEditor = () => {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [url, setUrl] = useState('');

  const handleOpenModal = () => {
    const selection = editorState.getSelection();
    const anchorKey = selection.getAnchorKey();
    const block = editorState.getCurrentContent().getBlockForKey(anchorKey);
    const blockFullText = block.getText();
    const {anchorOffset, focusOffset} = selection;
    console.log(selection);
    const blockSelectedText= anchorOffset < focusOffset ? blockFullText.slice(anchorOffset, focusOffset) : blockFullText.slice(focusOffset, anchorOffset);
    console.log(blockSelectedText);
    setSelected({
      selection,
      block,
      blockSelectedText
    });
    setIsModalVisible(true);
  };

  const findLinkEntities = (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges((character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK'
      );
    }, callback);
  };

  const decorator = () => new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link,
    },
  ]);

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
      console.log(entityKey);
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

  const createLinkEntity = (link, displayText) => {
    const currentContent = editorState.getCurrentContent();
    console.log(currentContent);
    currentContent.createEntity('LINK', 'MUTABLE', {
      url: link,
      target: '_blank',
    });

    const entityKey = currentContent.getLastCreatedEntityKey();
    console.log(entityKey);

    const textWithEntity = Modifier.replaceText(
      currentContent,
      selected.selection,
      displayText,
      editorState.getCurrentInlineStyle(),
      entityKey
    );

    const newState = EditorState.createWithContent(textWithEntity, decorator());
    setEditorState(newState);
  };

  return (
    <>
      <Flex border="1px solid lightSlateGrey" borderRadius="5px" display="block" margin="20px">
        <Flex width="50%" margin="10px">
          <Toolbar
            handleCommand={handleCommand}
            handleOnFileInputChange={handleOnFileInputChange}
            handleOpenModal={handleOpenModal}
          />
        </Flex>
        <Flex width="100%" borderTop="1px solid" />
        <Flex position="relative" marginX="10px" marginBottom="10px" marginTop="5px" display="block">
          <Editor
            blockRendererFn={renderBlock}
            editorState={editorState}
            blockStyleFn={myBlockStyleFn}
            onChange={setEditorState}
          />
        </Flex>
      </Flex>
      {isModalVisible && (
      <Flex  marginX="auto" flexDirection="column" width="40%">
        <Input value={selected?.blockSelectedText || ''} placeholder="word" marginBottom="10px" />
        <Input value={url} onChange={(e) => {setUrl(e.target.value)}} placeholder="url" marginBottom="10px" />
        <Input type="submit" onClick={() => {createLinkEntity(url, selected.blockSelectedText)}} />
      </Flex>
      )}
    </>
  );
}

export default MyEditor;
