import styled from 'styled-components';
import GrommetTableRow from 'grommet/components/TableRow';
import Image from 'grommet/components/Image';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Section from 'grommet/components/Section';

export const FullSection = styled(Section)`
  width: 100% !important;
  justify-content: space-around;
`;

export const MainContent = styled(Box)`
  position: relative;
  margin-bottom: 14px;
  background: #fff;
  @media screen and (max-width: 768px) {
    max-width: 100vw;
    box-sizing: border-box;
  }
  padding: 60px 0;
  width: 75%;
`;

export const MainBox = styled(Box)``;

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
