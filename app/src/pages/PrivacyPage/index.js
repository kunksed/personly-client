import React from 'react';
import cssModules from 'react-css-modules';
import { PrivacyContainer } from 'containers';
import styles from './index.module.scss';

const PrivacyPage = (props) => (
  <div className={styles.container}>
    <PrivacyContainer props={props} />
  </div>
);

export default cssModules(PrivacyPage, styles);
