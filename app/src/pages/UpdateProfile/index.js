import React from 'react';
import cssModules from 'react-css-modules';
import { UpdateProfileContainer } from 'containers';
import styles from './index.module.scss';

const UpdateProfile = (props) => (
  <div className={styles.container}>
    <UpdateProfileContainer props={props}/>
  </div>
);

export default cssModules(UpdateProfile, styles);
