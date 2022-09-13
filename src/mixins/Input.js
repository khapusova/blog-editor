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

const Input = styled.input`
  ${() => css`
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

export default Input;
