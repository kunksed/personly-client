import React from 'react';
import cssModules from 'react-css-modules';
import { LandingContainer } from 'containers';
import styles from './index.module.scss';

const LandingPage = (props) => (
  <div className={styles.container}>
    <LandingContainer props={props} />
  </div>
);

export default cssModules(LandingPage, styles);
