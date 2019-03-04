import React from 'react';
import cssModules from 'react-css-modules';
import { UpdateListingContainer } from 'containers';
import styles from './index.module.scss';

const UpdateListingPage = (props) => (
  <div className={styles.container}>
    <UpdateListingContainer props={props}/>
  </div>
);

export default cssModules(UpdateListingPage, styles);
