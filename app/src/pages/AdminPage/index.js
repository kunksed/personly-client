import React from 'react';
import cssModules from 'react-css-modules';
import { AdminContainer } from 'containers';
import styles from './index.module.scss';

const AdminPage = (props) => (
  <div className={styles.container}>
    <AdminContainer props={props} />
  </div>
);

export default cssModules(AdminPage, styles);
