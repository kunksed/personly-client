import React from 'react';
import cssModules from 'react-css-modules';
import { UpdatesContainer } from 'containers';
import styles from './index.module.scss';

const UpdatesPage = (props) => (
  <div className={styles.container}>
    <UpdatesContainer props={props}/>
  </div>
);

export default cssModules(UpdatesPage, styles);
