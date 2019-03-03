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
import { FullSection, MainContent, MainBox } from "./styles";
import { LoadingIndicator } from "components";
import { Navbar, AppFooter } from "components";
import styles from "./index.module.scss";
import readme from "./_readme.md";

class TermsContainer extends Component {
  render() {
    return (
      <MainBox alignContent="center" fill="horizontal" align="center">
        <FullSection primary direction="row">
          <Box
            basis="1/4"
            pad={{ vertical: "large", horizontal: "small" }}
            align="center"
            className={styles.aside}
          >
            <List>
              <ListItem justify="between" separator="horizontal">
                <Anchor path="/terms" className="active">
                  Terms of Service
                </Anchor>
              </ListItem>
              <ListItem justify="between">
                <Anchor path="/privacy">Privacy Policy</Anchor>
              </ListItem>
              <ListItem justify="between">
                <Anchor path="/contact">Contact</Anchor>
              </ListItem>
              <ListItem justify="between">
                <Anchor path="/risks">Risks</Anchor>
              </ListItem>
            </List>
          </Box>
          <MainContent align="center" justify="start">
            <Box align="left" pad="medium" margin="small" pad="large">
              <Heading tag="h2" strong={true}>
                Terms of Service
              </Heading>
              <Markdown content={readme} />
            </Box>
          </MainContent>
        </FullSection>
      </MainBox>
    );
  }
}

export default TermsContainer;
