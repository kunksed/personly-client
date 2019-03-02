import React from 'react';
import cssModules from 'react-css-modules';
import { QuestionContainer } from 'containers';
import styles from './index.module.scss';

const QuestionPage = (props) => (
  <div className={styles.container}>
    <QuestionContainer props={props} />
  </div>
);

export default cssModules(QuestionPage, styles);
