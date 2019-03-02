import React from 'react';
import cssModules from 'react-css-modules';
import { TradeContainer } from 'containers';
import styles from './index.module.scss';

const TradePage = (props) => (
  <div className={styles.container}>
    <TradeContainer props={props} />
  </div>
);

export default cssModules(TradePage, styles);
