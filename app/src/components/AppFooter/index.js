import React from "react";
import cssModules from "react-css-modules";
import Footer from "grommet/components/Footer";
import Box from "grommet/components/Box";
import Anchor from "grommet/components/Anchor";
import Heading from "grommet/components/Heading";
import Paragraph from "grommet/components/Paragraph";
import Image from "grommet/components/Image";
import { Divider } from "components";
import styles from "./index.module.scss";
import logo from "./logo_full.png";

const AppFooter = () => (
  <div>
    <Footer pad="large" colorIndex="light-2">
      <Box
        direction="row"
        align="center"
        justify="center"
        pad="large"
        responsive
        className={styles.flexOne}
      >
        <Box justify="center" basis="1/4" pad="medium" direction="column">
          <Image src={logo} className={styles.logoImage} />
        </Box>
        <Box justify="center" basis="1/4" pad="large" direction="column">
          <Heading tag="h3">For People</Heading>
          <Anchor path="/for-people">How it works</Anchor>
          <Anchor path="/faqs">FAQ</Anchor>
          <Anchor href="/search">Search</Anchor>
          <Anchor href="" />
        </Box>
        <Box justify="center" basis="1/4" pad="large" direction="column">
          <Heading tag="h3">For Investors</Heading>
          <Anchor path="/for-investors">How it works</Anchor>
          <Anchor path="/faqs/investor">FAQ</Anchor>
          <Anchor path="/risks">Risks</Anchor>
          <Anchor href="/terms">Terms</Anchor>
        </Box>
        <Box justify="center" basis="1/4" pad="large" direction="column">
          <Heading tag="h3">Company</Heading>
          <Anchor path="/about">About</Anchor>
          <Anchor path="/contact">Contact</Anchor>
          <Anchor href="/terms">Terms</Anchor>
          <Anchor href="" />
        </Box>
      </Box>
    </Footer>
    <Footer pad="none" colorIndex="light-2" align="center" justify="center">
      <Box align="center" justify="center" pad="none" responsive>
        <Divider align="center" justify="center" />
        <br />
        <Paragraph align="center" justify="center">
          An "investment" constitutes as a donation made to a person on the
          platform. Publicly traded people are under no legal obligation to
          perform work for shareholders, or comply with shareholder questions.
          All "shares" are not guaranteed or FDIC insured. <br /><br />  Terms
          offered by publicly traded people are subject to change. None of the
          information contained on Personly's website constitutes a
          recommendation or solicitation by Personly or its affiliates to buy or
          sell any securities or other financial instruments or other assets or
          provide any investment advice. <br/><br />  Personly does not verify information
          provided by people on this portal and makes no assurance as to the
          completeness or veracity of any such information provided. "Invest" at
          your own risk. Personly is not a broker dealer or an investment advisor.
        </Paragraph>
      </Box>
    </Footer>
  </div>
);

export default cssModules(AppFooter, styles);
