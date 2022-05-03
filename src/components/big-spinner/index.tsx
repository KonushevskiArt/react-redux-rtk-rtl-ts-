import React, { FC, ReactElement } from 'react';
import styles from './style.module.scss';

const Spinner: FC = () => {
  return (
    <div className={styles['loading']} data-testid="big-spinner">
      <div className={`${styles['spinner']} ${styles['spinner-2']}`}></div>
    </div>
  );
};

export default Spinner;
