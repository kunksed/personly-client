import React from 'react';
import cssModules from 'react-css-modules';
import { ContactContainer } from 'containers';
import styles from './index.module.scss';

const ContactPage = (props) => (
  <div className={styles.container}>
    <ContactContainer props={props} />
  </div>
);

export default cssModules(ContactPage, styles);
