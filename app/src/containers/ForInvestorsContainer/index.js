import React, { Component } from "react";
import Box from "grommet/components/Box";
import Section from "grommet/components/Section";
import Hero from "grommet/components/Hero";
import Heading from "grommet/components/Heading";
import Image from "grommet/components/Image";
import Timestamp from "grommet/components/Timestamp";
import Title from "grommet/components/Title";
import Anchor from "grommet/components/Anchor";
import Button from "grommet/components/Button";
import Status from "grommet/components/icons/Status";
import Columns from "grommet/components/Columns";
import FormField from "grommet/components/FormField";
import Footer from "grommet/components/Footer";
import Tiles from "grommet/components/Tiles";
import Tile from "grommet/components/Tile";
import Card from "grommet/components/Card";
import Highcharts from "highcharts/highstock";
import { MainBox, FullSection } from "./styles";
import { Navbar, AppFooter } from "components";
import { Divider, LoadingIndicator, LandingQuestionList } from "components";
import axios from "axios";
import styles from "./index.module.scss";

class ForInvestorsContainer extends Component {
  render() {
    return (
      <div>
        <Box className={styles.container}>
          <Box full="horizontal">
            <Hero
              justify="center"
              align="center"
              backgroundColorIndex="dark"
              className={styles.topBackground}
            >
              <Box basis="1/2" align="center" justify="center" pad="medium">
                <Box align="center" justify="center" pad="large">
                  <Heading
                    tag="h1"
                    strong={true}
                    align="center"
                    justify="center"
                  >
                    Invest in the future of innovators
                  </Heading>
                  <Heading tag="h3" align="center" justify="center">
                    With Personly, everyone can invest in high-potential
                    individuals who need a little support to achieve their
                    goals.
                  </Heading>
                  <br />
                  <Button
                    align="center"
                    justify="center"
                    className={styles.registerButton}
                    href="/register"
                    label="Become an investor"
                  />
                </Box>
              </Box>
              <Box basis="1/2" align="left" justify="left" pad="medium" />
            </Hero>
            <Box className={styles.containerMiddle}>
              <Section>
                <br />
                <Heading tag="h2" strong={true}>
                  How it works
                </Heading>
                <Heading tag="h3">
                  Become a publicly traded person and build a community of
                  supportive followers.
                </Heading>
                <Box align="center" justify="center" direction="row">
                  <Box className={styles.threeBox}>
                    <Heading tag="h3" strong={true}>
                      Fund their next project
                    </Heading>
                    <Heading tag="h5">
                      Fund the people you believe in and help them start their
                      next venture.
                    </Heading>
                  </Box>
                  <Box className={styles.threeBox}>
                    <Heading tag="h3" strong={true}>
                      Join their community
                    </Heading>
                    <Heading tag="h5">
                      Get the opportunity to meet a community of people invested
                      in the success of someone.
                    </Heading>
                  </Box>
                  <Box className={styles.threeBox}>
                    <Heading tag="h3" strong={true}>
                      Join in their experiences
                    </Heading>
                    <Heading tag="h5">
                      You can help them make decisions and get involved to help
                      them grow.
                    </Heading>
                  </Box>
                </Box>
              </Section>
            </Box>
            <Hero
              justify="center"
              align="center"
              className={styles.whiteHero}
              size="small"
            >
              <Box direction="row" justify="center" align="center">
                <Box basis="1/2" align="center" pad="medium">
                  <Image src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/career_progress_ivdb.svg" />
                </Box>
                <Box basis="1/2" align="start" pad="medium">
                  <Heading tag="h2" strong={true}>
                    What are publicly traded people?
                  </Heading>
                  <Heading tag="h4">
                    The concept of publicly traded people is relatively new.
                    Publicly traded people will offer "shares" in themselves in
                    exchange for allowing people to vote on decisions in their
                    lives.
                  </Heading>
                </Box>
              </Box>
            </Hero>
            <Hero
              justify="center"
              align="center"
              className={styles.whiteHero}
              size="small"
            >
              <Box direction="row" justify="center" align="center">
                <Box basis="1/2" align="center" pad="medium">
                  <Image src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/about_me_wa29.svg" />
                </Box>
                <Box basis="1/2" align="start" pad="medium">
                  <Heading tag="h2" strong={true}>
                    What do I get when I invest?
                  </Heading>
                  <Heading tag="h4">
                    When you invest on Personly, you get an artificial "share"
                    in a person, allowing you to help them finance their future
                    projects or goal, and giving you the ability to vote on
                    decisions in their life.
                  </Heading>
                </Box>
              </Box>
            </Hero>
            <Hero
              justify="center"
              align="center"
              className={styles.whiteHero}
              size="small"
            >
              <Box direction="row" justify="center" align="center">
                <Box basis="1/2" align="center" pad="medium">
                  <Image src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/revenue_3osh.svg" />
                </Box>
                <Box basis="1/2" align="start" pad="medium">
                  <Heading tag="h2" strong={true}>
                    How do I get a return?
                  </Heading>
                  <Heading tag="h4">
                    You can earn a return by selling your shares in a publicly
                    traded person if their share price appreciates. However, if
                    their share price decreases, then you may lose your
                    investment.
                  </Heading>
                </Box>
              </Box>
              <Footer pad="medium" align="center" justify="center">
                <Button label="Become an investor" href="/register" />
              </Footer>
            </Hero>
          </Box>
        </Box>
      </div>
    );
  }
}

export default ForInvestorsContainer;
