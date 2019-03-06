import React from 'react';
import cssModules from 'react-css-modules';
import { SearchContainer } from 'containers';
import styles from './index.module.scss';

const SearchPage = (props) => (
  <div className={styles.container}>
    <SearchContainer props={props} />
  </div>
);

export default cssModules(SearchPage, styles);
