// @flow
import React from 'react';
import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';
import Article from 'grommet/components/Article';
import Heading from 'grommet/components/Heading';
import Markdown from 'grommet/components/Markdown';
import Section from 'grommet/components/Section';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Anchor from 'grommet/components/Anchor';
import { Divider } from 'components';
import readme from './_readme.md';

type AboutLink = {
  name: string,
  url: string
};

export default function About(props: {
  links: AboutLink[],
}) {
  return (
    <Box align="center">
      <Article align="center" className="panel" pad="large">
        <Section align="center" justify="center">
          <Heading>
            About Me
          </Heading>
          <Divider />
        </Section>
        {typeof readme === 'string' &&
          <Markdown content={readme} />
        }
      </Article>
    </Box>
  );
}
