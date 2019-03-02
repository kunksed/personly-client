import React from 'react';
import cssModules from 'react-css-modules';
import { AdminGenderContainer } from 'containers';
import styles from './index.module.scss';

const AdminGenderPage = (props) => (
  <div className={styles.container}>
    <AdminGenderContainer props={props} />
  </div>
);

export default cssModules(AdminGenderPage, styles);
