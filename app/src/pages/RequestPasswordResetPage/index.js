import React from 'react';
import cssModules from 'react-css-modules';
import { RequestPasswordResetContainer } from 'containers';
import styles from './index.module.scss';

const RequestPasswordResetPage = (props) => (
  <div className={styles.container}>
    <RequestPasswordResetContainer {...props} props={props} />
  </div>
);

export default cssModules(RequestPasswordResetPage, styles);
