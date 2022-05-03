import React, { FC } from 'react';
import styles from './style.module.scss';

const Spinner: FC = () => {
  return (
    <div className={styles['loading']} data-testid="spinner">
      <div className={`${styles['spinner']} ${styles['spinner-1']}`}></div>
    </div>
  );
};

export default Spinner;
