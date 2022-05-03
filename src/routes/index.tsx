import AboutUsPage from 'pages/AboutUs';
import CardPage from 'pages/card/CardId';
import NotFoundPage from 'pages/Error';
import FormPage from 'pages/form/form';
import HomePage from 'pages/home/Home';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home/*" element={<HomePage />} />
      <Route path="/home/:id/*" element={<CardPage />} />
      <Route path="/about" element={<AboutUsPage />} />
      <Route path="/form" element={<FormPage />} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
