import React from 'react';
import cssModules from 'react-css-modules';
import { UserContainer } from 'containers';
import styles from './index.module.scss';

const UserPage = (props) => (
  <div className={styles.container}>
    <UserContainer props={props}/>
  </div>
);

export default cssModules(UserPage, styles);
