import React, { Component } from "react";
import Box from "grommet/components/Box";
import Section from "grommet/components/Section";
import Status from "grommet/components/icons/Status";
import Heading from "grommet/components/Heading";
import Anchor from "grommet/components/Anchor";
import Title from "grommet/components/Title";
import Timestamp from "grommet/components/Timestamp";
import Paragraph from "grommet/components/Paragraph";
import Columns from "grommet/components/Columns";
import Footer from "grommet/components/Footer";
import Button from "grommet/components/Button";
import Tiles from "grommet/components/Tiles";
import Tile from "grommet/components/Tile";
import FormField from "grommet/components/FormField";
import Accordion from "grommet/components/Accordion";
import AccordionPanel from "grommet/components/AccordionPanel";
import axios from "axios";
import { reduxForm } from "redux-form";
import { MainBox, FullSection } from "./styles";
import { Divider, LoadingIndicator } from "components";
import { Navbar, AppFooter } from "components";
import styles from "./index.module.scss";

class InvestorFaqsContainer extends Component {
  render() {
    return (
      <div>
        <Box className={styles.container}>
          <Section>
            <br />
            <Heading tag="h2" strong={true}>
              Frequently Asked Questions - Investors
            </Heading>
            <Accordion>
              <AccordionPanel heading="Why should I invest in someone?">
                <Paragraph>
                  Investing in someone is a way to become more involved with
                  their future progress. Do you know of a friend that is working
                  on a cool project and needs assistance? If you invested in
                  them via Personly, you could directly influence their decision
                  making and impart your unique experience on them, allowing you
                  to have a real impact on their life. An investment allows you
                  to become a mentor to someone in essence, which can be very
                  motivating in itself.
                </Paragraph>
              </AccordionPanel>
              <AccordionPanel heading="How can I keep up to date with my investments?">
                <Paragraph>
                  You will receive emails as new shareholder questions and
                  updates are posted. You are also encouraged to reach out to
                  the individual if you have any questions about them, and
                  follow them on social media etc if you are interested in
                  finding out more about them.
                </Paragraph>
              </AccordionPanel>
              <AccordionPanel heading="How do I earn a return?">
                <Paragraph>
                  You will earn a return if the share price of a publicly traded
                  person increases. If your investment succeeds, the share price
                  will rise which means you can sell your stake for a higher
                  price. However, if the person does not succeed, the share
                  price will decrease and you will turn a loss. Please refer to
                  our risk disclosures for more information on this.
                </Paragraph>
              </AccordionPanel>
              <AccordionPanel heading="Can I sell shares at any time?">
                <Paragraph>
                  There is no market open and close, meaning that you can sell
                  your shares at any time. You can only resell shares back to
                  the individual right now, meaning that selling a share will
                  reduce their balance and share price.
                </Paragraph>
              </AccordionPanel>
              <AccordionPanel heading="What is a 'market cap'?">
                <Paragraph>
                  The market cap is the total value of a publicly traded person,
                  which is calculated by multiplying the amount of shares
                  offered by the current share price.
                </Paragraph>
              </AccordionPanel>
              <AccordionPanel heading="What happens if a publicly traded person is not successful?">
                <Paragraph>
                  f a publicly traded person is not successful, then your
                  investment will be worth nothing. Publicly traded people are
                  responsible for making decisions based on shareholder
                  questions and updates, but are not bound by those decisions.
                </Paragraph>
              </AccordionPanel>
              <AccordionPanel heading="How do I request a payout of funds in my account?">
                <Paragraph>
                  Email ir@personly.app with the amount of money you want to
                  withdraw from your account balance and we will process your
                  payout as soon as possible.
                </Paragraph>
              </AccordionPanel>
              <AccordionPanel heading="What is the legal status of an 'investment'?">
                <Paragraph>
                  All "investments" are legally considered donations and do not
                  constitute a security offering. "Shareholders" refers to
                  people who own an artificial "share" in a publicly traded
                  person. "Shareholders" do not own any part of a publicly
                  traded person. For more information, please see our risk
                  disclosures.
                </Paragraph>
              </AccordionPanel>
            </Accordion>
          </Section>
        </Box>
      </div>
    );
  }
}
export default InvestorFaqsContainer;
