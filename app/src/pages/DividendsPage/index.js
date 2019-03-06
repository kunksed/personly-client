import React from 'react';
import cssModules from 'react-css-modules';
import { DividendsContainer } from 'containers';
import styles from './index.module.scss';

const DividendsPage = (props) => (
  <div className={styles.container}>
    <DividendsContainer props={props}/>
  </div>
);

export default cssModules(DividendsPage, styles);
