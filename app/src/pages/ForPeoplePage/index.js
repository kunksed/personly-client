import React from 'react';
import cssModules from 'react-css-modules';
import { ForPeopleContainer } from 'containers';
import styles from './index.module.scss';

const ForPeoplePage = (props) => (
  <div className={styles.container}>
    <ForPeopleContainer props={props} />
  </div>
);

export default cssModules(ForPeoplePage, styles);
