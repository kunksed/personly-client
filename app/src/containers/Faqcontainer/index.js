import React, { Component } from "react";
import Box from "grommet/components/Box";
import Section from "grommet/components/Section";
import Status from "grommet/components/icons/Status";
import Heading from "grommet/components/Heading";
import Anchor from "grommet/components/Anchor";
import Title from "grommet/components/Title";
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

class Faqcontainer extends Component {
  render() {
    return (
      <div>
        <Box className={styles.container}>
          <Section>
            <br />
            <Heading tag="h2" strong={true}>
              Frequently Asked Questions
            </Heading>
            <Accordion>
              <AccordionPanel heading="What is Personly?">
                <Paragraph>
                  Personly is a tool that allows you to invest in the success of
                  others. Inspired by the stock market, publicly traded people
                  offer "shares" to "investors", in exchange for allowing them
                  to vote on decisions in their life. This allows publicly
                  traded people to raise money, and get support from their
                  shareholders at the same time.
                </Paragraph>
              </AccordionPanel>
              <AccordionPanel heading="Who can become a publicly traded person?">
                <Paragraph>
                  We currently only support people over the age of 16 for legal
                  reasons. We do not accept anyone who advocates, promotes, or
                  supports any illegal and/or unethical actions, up to and
                  including hate speech, gambling, and other such crimes.
                </Paragraph>
              </AccordionPanel>
              <AccordionPanel heading="How does Personly work?">
                <Paragraph>
                  Personly allows you to become a publicly traded person, or
                  invest in publicly traded people. If you would like to become
                  a publicly traded person, then create your profile, and send
                  an email to ir@personly.app. We will then ask you for a
                  description on how you intend to spend the money you raise,
                  and conduct a vetting process to ensure that you are eligible
                  to be listed. When you are listed publicly, you can start to
                  raise money from shareholders and ask questions to your
                  shareholders.
                </Paragraph>
              </AccordionPanel>
              <AccordionPanel heading="What should I include in my listing description?">
                <Paragraph>
                  You should include basic information about yourself such as
                  your bio, what you plan to do with the money you raise, and
                  links to any projects or social media outlets that your
                  shareholders may be interested in reading. Your listing
                  description is your chance to sell yourself to potential
                  investors, so you should feel free to brag and list all of
                  your most important achievements, allowing investors to better
                  evaluate you as an investment opportunity.
                </Paragraph>
              </AccordionPanel>
              <AccordionPanel heading="What determines my share price?">
                <Paragraph>
                  The initial share price at the start of an Initial Public
                  Offering (IPO) is $1.00. Your share price will be based on
                  demand of your shares. Therefore, if you succeed and people
                  start to purchase more shares, your share price will go up.
                  However, if you do not succeed and investors lose confidence
                  in you, then your share price will go down.
                </Paragraph>
              </AccordionPanel>
              <AccordionPanel heading="What are shareholder questions?">
                <Paragraph>
                  Shareholder questions are your chance to get input from your
                  shareholders in decisions about your life and/or project.
                  Shareholder questions allow you to gain valuable insights from
                  your investors about a decision you are making, and creates a
                  forum for your shareholders to provide you with advice and
                  counsel as you make the decision.Anything you would ask a
                  friend for advice for would be a suitable shareholder
                  question. Your shareholders can vote on your decisions based
                  on how many shares they own in you.
                </Paragraph>
              </AccordionPanel>
              <AccordionPanel heading="How do I get listed on Personly?">
                <Paragraph>
                  Send us an email at ir@personly.app. We will then ask you for
                  information about how much you hope to raise, and how you
                  intend to spend the money you raise. We will then conduct an
                  initial review to ensure that you qualify to join the
                  platform.
                </Paragraph>
              </AccordionPanel>
              <AccordionPanel heading="How can I attract investors?">
                <Paragraph>
                  We send out updates with the latest offerings, and also
                  showcase profiles publicly on our website, which exposes you
                  to our community. However, you should also spend time
                  marketing your profile on social media and sharing it with
                  your friends in order to reach maximal exposure.
                </Paragraph>
              </AccordionPanel>
              <AccordionPanel heading="How do shareholder updates work?">
                <Paragraph>
                  We encourage all publicly traded people to post frequent
                  shareholder updates which allow shareholders and prospective
                  shareholders to track your progress and offer their support
                  when you need it. You should aim to post a shareholder update
                  at least every month to keep your investors posted on the
                  milestones you have achieved and how they can help you.
                </Paragraph>
              </AccordionPanel>
              <AccordionPanel heading="Are publicly traded people bound by shareholder questions?">
                <Paragraph>
                  Shareholder questions are not binding, but are rather a
                  guideline for publicly traded people so they can get a
                  collective insight from their shareholders on their view of a
                  particular topic.
                </Paragraph>
              </AccordionPanel>
            </Accordion>
          </Section>
        </Box>
      </div>
    );
  }
}
export default Faqcontainer;
