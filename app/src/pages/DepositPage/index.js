import React from 'react';
import cssModules from 'react-css-modules';
import { DepositContainer } from 'containers';
import styles from './index.module.scss';

const DepositPage = (props) => (
  <div className={styles.container}>
    <DepositContainer props={props} />
  </div>
);

export default cssModules(DepositPage, styles);
