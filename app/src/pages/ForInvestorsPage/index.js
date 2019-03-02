import React from 'react';
import cssModules from 'react-css-modules';
import { ForInvestorsContainer } from 'containers';
import styles from './index.module.scss';

const ForInvestorsPage = (props) => (
  <div className={styles.container}>
    <ForInvestorsContainer props={props} />
  </div>
);

export default cssModules(ForInvestorsPage, styles);
