import styled from 'styled-components';
import Menu from 'grommet/components/Menu';
import Box from 'grommet/components/Box';

export const StyledMenu = styled(Menu)`
  flex-direction: row !important;
  flex-grow: 1 !important;
  align-items: center;
  justify-content: flex-end;
`;

export const StyledLogo = styled.img`
  max-height: 45px;
  margin-left: 25px;
`;

export const LogoPlaceholder = styled.div`
  width: 177px;
  height: 45px;
  background-color: transparent;
`;

export const StyledBox = styled(Box)`
  min-width: 300px;
  min-height: 300px;
  padding-top: 20px;
  padding-bottom: 20px;
`;
