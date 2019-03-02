import React from 'react';
import cssModules from 'react-css-modules';
import { AboutContainer } from 'containers';
import styles from './index.module.scss';

const AboutPage = (props) => (
  <div className={styles.container}>
    <AboutContainer props={props}/>
  </div>
);

export default cssModules(AboutPage, styles);
