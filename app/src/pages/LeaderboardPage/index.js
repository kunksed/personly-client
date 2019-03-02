import React from 'react';
import cssModules from 'react-css-modules';
import { LeaderboardContainer } from 'containers';
import styles from './index.module.scss';

const LeaderboardPage = (props) => (
  <div className={styles.container}>
    <LeaderboardContainer props={props}/>
  </div>
);

export default cssModules(LeaderboardPage, styles);
