import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Article from 'grommet/components/Article';
import Heading from 'grommet/components/Heading';
import Markdown from 'grommet/components/Markdown';
import Section from 'grommet/components/Section';
import { Divider } from 'components';
import readme from './_readme.md';

class StartContainer extends Component {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Box>
        <Section align="center" justify="center" />
        <Box align="center">
          <Article align="center" className="panel" pad="large">
            <Section align="center" justify="center">
              <Heading>Get Started</Heading>
              <Divider />
            </Section>
            {typeof readme === 'string' && <Markdown content={readme} />}
          </Article>
        </Box>
      </Box>
    );
  }
}

export default StartContainer;
