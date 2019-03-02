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
        <Anchor path="/people">People</Anchor>
        <Anchor path="/for-people">For People</Anchor>
        <Anchor path="/for-investors">For Investors</Anchor>
        <Anchor href="mailto:james@opencommit.com">Contact</Anchor>
      </nav>
      <nav
        className={
          'grommetux-box grommetux-box--direction-row ' +
          'grommetux-box--responsive grommetux-box--pad-none ' +
          'grommetux-menu grommetux-menu--row grommetux-menu--inline'
        }
      >
        Personly Trading, {(new Date()).getFullYear()}<br />
      </nav>
    </Box>
  </Footer>
);

export default cssModules(AppFooter, styles);
