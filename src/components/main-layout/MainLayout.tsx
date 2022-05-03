import React, { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router';

import style from './style.module.scss';
interface Props {
  children?: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   navigate('/home');
  // }, []);
  return (
    <div className={style.mainLayout} data-testid="main-layout">
      {children}
    </div>
  );
};

export default MainLayout;
