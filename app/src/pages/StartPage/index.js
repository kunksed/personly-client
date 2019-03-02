import React from 'react';
import cssModules from 'react-css-modules';
import { StartContainer } from 'containers';
import styles from './index.module.scss';

const StartPage = () => (
  <div className={styles.container}>
    <StartContainer />
  </div>
);

export default cssModules(StartPage, styles);
