import React from 'react';
import cssModules from 'react-css-modules';
import { ProfileContainer } from 'containers';
import styles from './index.module.scss';

const ProfilePage = (props) => (
  <div className={styles.container}>
    <ProfileContainer props={props} />
  </div>
);

export default cssModules(ProfilePage, styles);
