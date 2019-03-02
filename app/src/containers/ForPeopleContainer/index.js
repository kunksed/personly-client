import React, { Component, } from 'react';
import Box from 'grommet/components/Box';
import Section from 'grommet/components/Section';
import Hero from 'grommet/components/Hero';
import Heading from 'grommet/components/Heading';
import Image from 'grommet/components/Image';
import Timestamp from 'grommet/components/Timestamp';
import Title from 'grommet/components/Title';
import Anchor from 'grommet/components/Anchor';
import Button from 'grommet/components/Button';
import Status from 'grommet/components/icons/Status';
import Columns from 'grommet/components/Columns';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import { MainBox, FullSection } from './styles';
import { Navbar, AppFooter } from "components";
import { Divider, LoadingIndicator, LandingQuestionList } from 'components';
import axios from 'axios';
import styles from './index.module.scss';

class ForPeoplePage extends Component {
  constructor() {
    super();
    this.state = {
      questions: 0,
      getData: false,
      isLoading: true,
    };
  }

  render() {
    return (
      <div>
        <Box className={styles.container}>
          <Box full="horizontal">
            <Hero
              justify="center"
              align="center"
              backgroundColorIndex="dark"
              className={styles.topHeroBackground}
            >
              <Box basis="1/2" align="center" justify="center" pad="medium">
                <Box
                  align="center"
                  justify="center"
                  pad="large"
                  colorIndex="grey-2-a"
                >
                  <Heading align="center" tag="h1">
                    Become a Publicly Traded Person
                  </Heading>
                  <Heading align="center" tag="h2">
                    Gain support from the people who believe in your future.
                  </Heading>
                  <Button className={styles.registerButton} href="mailto:james@opencommit.com?subject=Become Public on Personly" label="Get Started" />
                </Box>
              </Box>
            </Hero>
          </Box>
          <Section className={styles.mainContainer}>
            <Columns size="medium" align="center" justify="center">
              <Box>
                <Image src="https://sfo2.digitaloceanspaces.com/pheta/secondimage.png" />
              </Box>
              <Box>
                <Heading tag="h2" strong={true}>More than money</Heading>
                <Heading tag="h4">Personly allows you to grow a community of loyal people who can provide you with advice and help guide you in making big decisions.</Heading>
              </Box>
            </Columns>
          </Section>
        </Box>
      </div>
    );
  }
}

export default ForPeoplePage;
