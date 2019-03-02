import React from 'react';
import cssModules from 'react-css-modules';
import { LoginContainer } from 'containers';
import styles from './index.module.scss';

const LoginPage = (props) => (
  <div className={styles.container}>
    <LoginContainer props={props}/>
  </div>
);

export default cssModules(LoginPage, styles);
