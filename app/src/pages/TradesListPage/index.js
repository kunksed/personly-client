import React from 'react';
import cssModules from 'react-css-modules';
import { TradesListContainer } from 'containers';
import styles from './index.module.scss';

const TradesListPage = (props) => (
  <div className={styles.container}>
    <TradesListContainer props={props}/>
  </div>
);

export default cssModules(TradesListPage, styles);
