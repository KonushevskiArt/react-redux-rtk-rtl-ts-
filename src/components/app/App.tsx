import React from 'react';
import MainLayout from '../main-layout/MainLayout';
import { BrowserRouter } from 'react-router-dom';
import Header from '../header/Header';
import style from './style.module.scss';
import AppRoutes from 'routes';

const App = () => {
  return (
    <div className={style.app} data-testid="app">
      <BrowserRouter>
        <Header />
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </BrowserRouter>
    </div>
  );
};

export default App;
