import React from 'react';
import cssModules from 'react-css-modules';
import { ShareholderRelationsContainer } from 'containers';
import styles from './index.module.scss';

const ShareholderRelationsPage = (props) => (
  <div className={styles.container}>
    <ShareholderRelationsContainer props={props} />
  </div>
);

export default cssModules(ShareholderRelationsPage, styles);
