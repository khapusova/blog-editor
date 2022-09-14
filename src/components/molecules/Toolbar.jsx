import React, { useMemo } from 'react';
import { Flex, Button, Input } from "../../mixins";

const toolbarDummyProps = [
  {
    id: 1,
    content: "B",
    type: "button",
    command: "bold"
  },
  {
    id: 2,
    content: "I",
    type: "button",
    command: "italic"
  },
  {
    id: 3,
    content: "U",
    type: "button",
    command: "underline"
  },
  {
    id: 4,
    content: "img",
    type: "input",
    handleOnClick: () => {}
  },
  {
    id: 5,
    content: "</>",
    type: "button",
    command: "code"
  },
  {
    id: 5,
    content: "url",
    type: "button",
    command: "url"
  }
];

const Toolbar = ({handleCommand, handleOnFileInputChange, handleOpenModal}) => {
  const memoButtons = useMemo(() => toolbarDummyProps.map(comp =>
    comp.type === "button" ? (
    <Button
      padding="0px"
      height="30px"
      width="30px"
      color="white"
      backgroundColor="lightSlateGrey"
      onClick={() => comp.command === 'url' ? handleOpenModal() : handleCommand(comp.command)}
    >
      {comp.content}
    </Button>
    ) : (
      <Flex backgroundColor="lightSlateGrey" position="relative">
        <Button
          height="30px"
          width="30px"
          position="absolute"
          color="white"
          backgroundColor="lightSlateGrey"
          onClick={comp.handleOnClick}
        >
          {comp.content}
        </Button>
        <Input
          id="fileInput"
          accept="image/png,image/jpeg,image/jpg,image/gif"
          onChange={handleOnFileInputChange}
          height="30px"
          width="30px"
          type="file"
          opacity="0%"
        />
      </Flex>
    )
  ), [handleCommand, handleOnFileInputChange, handleOpenModal]);

  return (
    <Flex width="100%" justifyContent="space-between">
      {memoButtons.map(but => but)}
    </Flex>
  );
};

export default Toolbar;
