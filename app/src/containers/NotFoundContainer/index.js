import React, { Component } from 'react';
import styles from './index.module.scss';
import Heading from 'grommet/components/Heading';
import Image from 'grommet/components/Image';
import { Divider } from 'components';
import NotFoundImage from './404.png';
import regeneratorRuntime from 'regenerator-runtime';
import { Navbar, AppFooter } from "components";
import {
  FullSection,
  MainContent,
  MainBox,
} from './styles';

class NotFoundContainer extends Component {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
      <MainBox
        alignContent="center"
        fill="horizontal"
        align="center"
        className={styles.container}
      >
        <FullSection primary direction="row">
          <MainContent
            align="center"
            justify="start"
            pad={{ vertical: 'large' }}
          >
            <Heading tag="h1" align="center">
              Page Not Found
            </Heading>
            <Divider />
            <Image src={NotFoundImage} />
            <br />
            <Heading tag="h2" align="center">
              This decision is not up for vote!
            </Heading>
          </MainContent>
        </FullSection>
      </MainBox>
    </div>
    );
  }
}

export default NotFoundContainer;
