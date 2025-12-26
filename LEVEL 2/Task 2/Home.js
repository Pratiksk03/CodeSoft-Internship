import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h1>Welcome to Quiz App</h1>
    <Link to="/create">Create a Quiz</Link> | <Link to="/quizzes">Take a Quiz</Link>
  </div>
);

export default Home;
