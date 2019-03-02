import React from 'react';
import cssModules from 'react-css-modules';
import { InvestmentsContainer } from 'containers';
import styles from './index.module.scss';

const InvestmentsListPage = (props) => (
  <div className={styles.container}>
    <InvestmentsContainer props={props} />
  </div>
);

export default cssModules(InvestmentsListPage, styles);
