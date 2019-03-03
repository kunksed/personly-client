import React from 'react';
import cssModules from 'react-css-modules';
import { EditShareholderUpdateContainer } from 'containers';
import styles from './index.module.scss';

const EditShareholderUpdatePage = (props) => (
  <div className={styles.container}>
    <EditShareholderUpdateContainer props={props} />
  </div>
);

export default cssModules(EditShareholderUpdatePage, styles);
