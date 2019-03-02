import React from 'react';
import cssModules from 'react-css-modules';
import { PersonContainer } from 'containers';
import styles from './index.module.scss';

const PersonPage = (props) => (
  <div className={styles.container}>
    <PersonContainer props={props}/>
  </div>
);

export default cssModules(PersonPage, styles);
