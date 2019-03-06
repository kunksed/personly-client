import React from 'react';
import cssModules from 'react-css-modules';
import { NotificationsContainer } from 'containers';
import styles from './index.module.scss';

const NotificationsPage = (props) => (
  <div className={styles.container}>
    <NotificationsContainer props={props}/>
  </div>
);

export default cssModules(NotificationsPage, styles);
