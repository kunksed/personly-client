import React from 'react';
import cssModules from 'react-css-modules';
import { RisksContainer } from 'containers';
import styles from './index.module.scss';

const RisksPage = (props) => (
  <div className={styles.container}>
    <RisksContainer props={props} />
  </div>
);

export default cssModules(RisksPage, styles);
