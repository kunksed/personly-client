// @flow
import React from 'react';
import cssModules from 'react-css-modules';
import Spinning from 'grommet/components/icons/Spinning';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import styles from './index.module.scss';

function LoadingIndicator(props: {
  isLoading: boolean,
  message: ?string
}) {
  const { isLoading } = props;
  const title = message || 'Loading';
  const messages = [
    'Contemplating banana bread recipes...',
    'Reticulating Splines...',
    'Adding duplication fluid to our ditto machine...',
    'Dusting off your slide-rule...',
    'Cleaning the whiteboard...',
    'Have a great day!',
    "Adjusting flux capacitor...",
  ];
  var message = messages[Math.floor(Math.random() * messages.length)];
  return (
    <Box
      align="center"
      justify="center"
      className={styles.loadingIndicator}
    >
      {isLoading &&
        <Box
          align="center"
          justify="center"
        >
          <Spinning />
          <br />
          <Heading tag="h3" align="center">{message}</Heading>
        </Box>
      }
    </Box>
  );
}

export default cssModules(LoadingIndicator, styles);
