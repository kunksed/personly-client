import React from 'react';
import cssModules from 'react-css-modules';
import { RegisterContainer } from 'containers';
import styles from './index.module.scss';

const RegisterPage = (props) => (
  <div className={styles.container}>
    <RegisterContainer props={props}/>
  </div>
);

export default cssModules(RegisterPage, styles);
