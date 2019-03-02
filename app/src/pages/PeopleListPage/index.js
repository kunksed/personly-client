import React from 'react';
import cssModules from 'react-css-modules';
import { PeopleListContainer } from 'containers';
import styles from './index.module.scss';

const PeopleListPage = (props) => (
  <div className={styles.container}>
    <PeopleListContainer props={props}/>
  </div>
);

export default cssModules(PeopleListPage, styles);
