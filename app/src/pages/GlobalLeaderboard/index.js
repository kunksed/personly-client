import React from 'react';
import cssModules from 'react-css-modules';
import { GlobalLeaderboardContainer } from 'containers';
import styles from './index.module.scss';

const GlobalLeaderboard = (props) => (
  <div className={styles.container}>
    <GlobalLeaderboardContainer props={props} />
  </div>
);

export default cssModules(GlobalLeaderboard, styles);
