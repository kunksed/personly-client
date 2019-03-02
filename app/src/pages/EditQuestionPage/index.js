import React from 'react';
import cssModules from 'react-css-modules';
import { EditQuestionContainer } from 'containers';
import styles from './index.module.scss';

const EditQuestionPage = (props) => (
  <div className={styles.container}>
    <EditQuestionContainer props={props} />
  </div>
);

export default cssModules(EditQuestionPage, styles);
