import React from 'react';
import cssModules from 'react-css-modules';
import Footer from 'grommet/components/Footer';
import Box from 'grommet/components/Box';
import Anchor from 'grommet/components/Anchor';
import styles from './index.module.scss';

const AppFooter = () => (
  <Footer pad="large" colorIndex="light-2">
    <Box
      direction="column"
      align="center"
      pad="none"
      responsive
      className={styles.flexOne}
    >
      <nav
        className={
          'grommetux-box grommetux-box--direction-row ' +
          'grommetux-box--responsive grommetux-box--pad-none ' +
          'grommetux-menu grommetux-menu--row grommetux-menu--inline'
        }
      >
        <Anchor path="/about">About</Anchor>
        <Anchor path="/trade">Trade</Anchor>
        <Anchor path="/questions">Questions</Anchor>
        <Anchor href="https://twitter.com/jamesg_oca">Twitter</Anchor>
      </nav>
      <nav
        className={
          'grommetux-box grommetux-box--direction-row ' +
          'grommetux-box--responsive grommetux-box--pad-none ' +
          'grommetux-menu grommetux-menu--row grommetux-menu--inline'
        }
      >
        <Anchor href="mailto:james@opencommit.com">Contact</Anchor>
        <Anchor path="/users">Shareholders</Anchor>
        <Anchor path="/leaderboard">Leaderboard</Anchor>
        <Anchor path="/updates">Updates</Anchor>
      </nav>
      <nav
        className={
          'grommetux-box grommetux-box--direction-row ' +
          'grommetux-box--responsive grommetux-box--pad-none ' +
          'grommetux-menu grommetux-menu--row grommetux-menu--inline'
        }
      >
        {process.env.NAME ? process.env.NAME : "James Gallagher"} Trading, {(new Date()).getFullYear()}<br />
        Written by <a href="https://twitter.com/jamesg_oca">James Gallagher</a>.
      </nav>
    </Box>
  </Footer>
);

export default cssModules(AppFooter, styles);
