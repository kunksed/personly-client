import React from 'react';
import cssModules from 'react-css-modules';
import { ShareholdersContainer } from 'containers';
import styles from './index.module.scss';

const ShareholdersPage = (props) => (
  <div className={styles.container}>
    <ShareholdersContainer props={props} />
  </div>
);

export default cssModules(ShareholdersPage, styles);
