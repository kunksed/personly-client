import React, { Component } from "react";
import Box from "grommet/components/Box";
import Section from "grommet/components/Section";
import Hero from "grommet/components/Hero";
import Heading from "grommet/components/Heading";
import Image from "grommet/components/Image";
import Anchor from "grommet/components/Anchor";
import Paragraph from "grommet/components/Paragraph";
import Markdown from "grommet/components/Markdown";
import List from "grommet/components/List";
import Button from "grommet/components/Button";
import ListItem from "grommet/components/ListItem";
import Split from "grommet/components/Split";
import { FullSection, MainContent, MainBox } from "./styles";
import { Divider } from "components";
import { Navbar, AppFooter } from "components";
import styles from "./index.module.scss";

class ContactContainer extends Component {
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
                <Anchor path="/terms">Terms of Service</Anchor>
              </ListItem>
              <ListItem justify="between">
                <Anchor path="/privacy">Privacy Policy</Anchor>
              </ListItem>
              <ListItem justify="between">
                <Anchor path="/contact" className="active">
                  Contact
                </Anchor>
              </ListItem>
              <ListItem justify="between">
                <Anchor path="/risks">Risks</Anchor>
              </ListItem>
            </List>
          </Box>
          <MainContent align="center" justify="start">
            <Box align="left" pad="medium" margin="small" pad="large">
              <Heading tag="h2" strong={true}>
                Contact
              </Heading>
              <Heading tag="h3" strong={true}>
                Investors
              </Heading>
              <Paragraph>
                If you have any questions about investing in people through
                Personly, use this button.
                <br />
                <br />
                Questions relating to individuals listed on the platform should
                be directed to those individuals.
              </Paragraph>
              <Button
                href="mailto:ir@personly.app?subject=Investor Contact"
                label="Investor contact"
              />
              <Divider />
              <Heading tag="h3" strong={true}>
                Publicly Traded People
              </Heading>
              <Paragraph>
                If you have any questions about getting listed on Personly,
                eligibility, or compliance, use this button.
              </Paragraph>
              <Button
                href="mailto:ir@personly.app?subject=Investment Contact"
                label="Investment contact"
              />
              <Divider />
              <Heading tag="h3" strong={true}>
                General Inquiries
              </Heading>
              <Paragraph>
                If you have any other question about Personly, use this button.
              </Paragraph>
              <Button
                href="mailto:ir@personly.app?subject=Investment Contact"
                label="General inquiry"
              />
            </Box>
          </MainContent>
        </FullSection>
      </MainBox>
    );
  }
}

export default ContactContainer;
