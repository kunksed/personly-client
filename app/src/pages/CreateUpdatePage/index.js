import React from 'react';
import cssModules from 'react-css-modules';
import { CreateUpdateContainer } from 'containers';
import styles from './index.module.scss';

const CreateUpdatePage = (props) => (
  <div className={styles.container}>
    <CreateUpdateContainer props={props}/>
  </div>
);

export default cssModules(CreateUpdatePage, styles);
