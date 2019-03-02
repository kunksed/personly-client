import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Section from 'grommet/components/Section';
import { Divider, About } from 'components';
import { Navbar, AppFooter } from "components";
import links from './data';

class AboutContainer extends Component {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Navbar pathname={this.props.props.pathname} />
      <Box>
        <Section align="center" justify="center" />
        <About links={links} />
      </Box>
      <AppFooter />
    </div>
    );
  }
}

export default AboutContainer;
