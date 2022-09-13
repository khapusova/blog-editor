import styled, { css } from 'styled-components';
import {
  layout,
  border,
  shadow,
  space,
  color,
  position,
  grid,
  flexbox
} from 'styled-system';

const Flex = styled.div`
  ${() => css`
    display: flex;

    ${layout}
    ${shadow}
    ${border}
    ${space}
    ${color}
    ${position}
    ${grid}
    ${flexbox}
  `}
`;

export default Flex;
