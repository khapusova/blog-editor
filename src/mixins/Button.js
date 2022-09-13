import styled, { css } from 'styled-components';
import {
  layout,
  border,
  space,
  position,
  color,
  typography
} from 'styled-system';

const Button = styled.button`
  ${({ theme: { colors }, disabled }) => css`
    border: none;
    cursor: pointer;

    ${position}
    ${typography}
    ${border}
    ${layout}
    ${space}
    ${color}
  `}
`;

export default Button;
