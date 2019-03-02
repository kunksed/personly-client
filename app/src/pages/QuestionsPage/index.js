import React from 'react';
import cssModules from 'react-css-modules';
import { QuestionsContainer } from 'containers';
import styles from './index.module.scss';

const QuestionsPage = (props) => (
  <div className={styles.container}>
    <QuestionsContainer props={props}/>
  </div>
);

export default cssModules(QuestionsPage, styles);
