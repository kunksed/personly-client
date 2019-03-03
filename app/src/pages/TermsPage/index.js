import React from 'react';
import cssModules from 'react-css-modules';
import { TermsContainer } from 'containers';
import styles from './index.module.scss';

const TermsPage = (props) => (
  <div className={styles.container}>
    <TermsContainer props={props} />
  </div>
);

export default cssModules(TermsPage, styles);
