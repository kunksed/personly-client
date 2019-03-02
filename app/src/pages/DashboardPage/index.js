import React from 'react';
import cssModules from 'react-css-modules';
import { DashboardContainer } from 'containers';
import styles from './index.module.scss';

const DashboardPage = (props) => (
  <div className={styles.container}>
    <DashboardContainer props={props} />
  </div>
);

export default cssModules(DashboardPage, styles);
