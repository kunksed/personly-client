import React from 'react';
import cssModules from 'react-css-modules';
import { CreateQuestionContainer } from 'containers';
import styles from './index.module.scss';

const CreateQuestionPage = (props) => (
  <div className={styles.container}>
    <CreateQuestionContainer props={props}/>
  </div>
);

export default cssModules(CreateQuestionPage, styles);
