import React from 'react';
import cssModules from 'react-css-modules';
import { NotFoundContainer } from 'containers';
import styles from './index.module.scss';

const NotFound = (props) => (
  <div className={styles.container}>
    <NotFoundContainer props={props} />
  </div>
);

export default cssModules(NotFound, styles);
