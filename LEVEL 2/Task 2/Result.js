import React from 'react';
import { useLocation } from 'react-router-dom';

const Result = () => {
  const { state } = useLocation();

  return (
    <div>
      <h2>Quiz Completed!</h2>
      <
