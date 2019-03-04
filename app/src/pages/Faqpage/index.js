import React from 'react';
import cssModules from 'react-css-modules';
import { Faqcontainer } from 'containers';
import styles from './index.module.scss';

const Faqpage = (props) => (
  <div className={styles.container}>
    <Faqcontainer props={props} />
  </div>
);

export default cssModules(Faqpage, styles);
