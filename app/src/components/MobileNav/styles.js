import styled from 'styled-components';
import GrommetTableRow from 'grommet/components/TableRow';
import Image from 'grommet/components/Image';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Heading from 'grommet/components/Heading';
import Section from 'grommet/components/Section';
import Header from 'grommet/components/Header';

export const StyledHeader = styled(Header)`
  border-bottom: 1px solid #dbe2e8;
  box-shadow: 0 2px 4px 0 rgba(46, 61, 73, 0.2);
  position: relative;
`;

export const FullSection = styled(Section)`
  width: 100% !important;
  justify-content: space-around;
`;

export const MainContent = styled(Box)`
  position: relative;
  margin-bottom: 14px;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(46,61,73,.2);
  border: 1px solid #dbe2e8;
  @media screen and (max-width: 768px) {
    max-width: 100vw;
    box-sizing: border-box;
  }
  padding: 60px 0;
  width: 50%;
`;

export const MainBox = styled(Box)`
  background-color: #fafbfc;
`;

export const AsideButtonContainer = styled(Box)`
  position: absolute;
  top: 10px;
  right: 10px;
  @media screen and (max-width: 1450px) {
    display: none !important;
  }
`;

const sizeMap = (size) => {
  switch(size) {
    case 'xsmall':
      return 50;
    case 'small':
      return 100;
    case 'medium':
      return 150;
    case 'large':
      return 200;
    case 'xlarge':
      return 300;
    default:
      return 100;
  }
};

export const Wrapper = styled(Box)`
  width: 200px;
`;

export const ThumbnailImage = styled(Image)`
  border: solid 4px #FFFFFF;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2);
  display: inline-block;
  line-height: 0;
  max-width: 100%;
  height: auto;
  transition: all 200ms ease-out;
`;

export const StyledLogo = styled.img`
  max-height: 45px;
  margin-left: 25px;
`;

export const StyledMenu = styled(Menu)`
  flex-direction: row !important;
  flex-grow: 1 !important;
  align-items: center;
  justify-content: flex-end;
  margin-right: 20px;
`;
