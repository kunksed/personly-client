import React from 'react';
import cssModules from 'react-css-modules';
import { InvestorFaqsContainer } from 'containers';
import styles from './index.module.scss';

const InvestorFaqsPage = (props) => (
  <div className={styles.container}>
    <InvestorFaqsContainer props={props} />
  </div>
);

export default cssModules(InvestorFaqsPage, styles);
