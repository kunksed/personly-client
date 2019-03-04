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

class ForPeople extends Component {
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
                    Become a Publicly Traded Person.
                  </Heading>
                  <Heading tag="h3" align="center" justify="center">
                    Get support from people who are invested in your success.
                  </Heading>
                  <br />
                  <Button
                    align="center"
                    justify="center"
                    className={styles.registerButton}
                    href="mailto:ir@personly.app"
                    label="Go public"
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
                      Launch an IPO
                    </Heading>
                    <Heading tag="h5">
                      If you have a goal you want to achieve, or need guidance
                      in making decisions, Personly can help. You can get
                      started by writing a description about yourself, deciding
                      your IPO terms, and filing to launch on Personly.
                    </Heading>
                  </Box>
                  <Box className={styles.threeBox}>
                    <Heading tag="h3" strong={true}>
                      Raise funds
                    </Heading>
                    <Heading tag="h5">
                      Raise funds from the Personly community and your friends.
                      Your share price is correlated with demand and will change
                      as more people get involved with your offering.
                    </Heading>
                  </Box>
                  <Box className={styles.threeBox}>
                    <Heading tag="h3" strong={true}>
                      Post questions and updates
                    </Heading>
                    <Heading tag="h5">
                      You can post questions for shareholders to vote on so they
                      can help you make more informed descisions. You can also
                      post shareholder updates and get feedback on your latest
                      work and projects from your community.
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
                <Button label="Go public" href="mailto:ir@personly.app" />
              </Footer>
            </Hero>
          </Box>
        </Box>
      </div>
    );
  }
}

export default ForPeople;
