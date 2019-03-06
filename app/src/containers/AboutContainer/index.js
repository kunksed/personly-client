import React, { Component } from "react";
import Box from "grommet/components/Box";
import Section from "grommet/components/Section";
import Hero from "grommet/components/Hero";
import Heading from "grommet/components/Heading";
import Image from "grommet/components/Image";
import Anchor from "grommet/components/Anchor";
import Table from "grommet/components/Table";
import Markdown from "grommet/components/Markdown";
import List from "grommet/components/List";
import ListItem from "grommet/components/ListItem";
import Split from "grommet/components/Split";
import SocialTwitterIcon from 'grommet/components/icons/base/SocialTwitter';
import { FullSection, MainContent, MainBox } from "./styles";
import { Navbar, AppFooter, Divider } from "components";
import styles from "./index.module.scss";
import readme from "./_readme.md";

class AboutContainer extends Component {
  render() {
    return (
      <MainBox alignContent="center" fill="horizontal" align="center">
        <FullSection primary direction="row">
          <MainContent align="center" justify="start">
            <Box align="left" pad="medium" margin="small" pad="large">
              <Heading tag="h2" strong={true} align="center" justify="center">
                About Personly
              </Heading>
              <Markdown content={readme} align="center" justify="center" />
              <Divider />
              <Columns
                maxCount={2}
                justify="center"
                masonry
              >
              <Box
                className={styles.contributor}
                align="center"
                justify="center"
                size="large"
              >
                <img
                  alt="Avatar"
                  src="https://pbs.twimg.com/profile_images/1074379859491729408/Bkl1xAGr_bigger.jpg"
                  className={styles.avatar}
                />
                <Heading tag="h3" align="center">
                  James Gallagher
                </Heading>
                <Paragraph>
                  Chief Executive Officer; Pioneer. Editor at Maker Mag and publicly trade person.
                </Paragraph>
                <Anchor
                  icon={<SocialTwitterIcon />}
                  href={`https://twitter.com/jamesg_oca`}
                  primary
                >
                  @jamesg_oca
                </Anchor>
              </Box>
              </Columns>
              <Divider />
              <Heading tag="h3" align="center">
                Interested in becoming a publicly traded person?
              </Heading>
              <Button href="/for-people" label="Go public" />
            </Box>
          </MainContent>
        </FullSection>
      </MainBox>
    );
  }
}

export default AboutContainer;
