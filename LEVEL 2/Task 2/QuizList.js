import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/quizzes')
      .then(res => res.json())
      .then(data => setQuizzes(data));
  }, []);

  return (
    <div>
      <h2>Available Quizzes</h2>
      {quizzes.map(q => (
        <div key={q.id}>
          <h3>{q.title}</h3>
          <Link to={`/quiz/${q.id}`}>Take Quiz</Link>
        </div>
      ))}
    </div>
  );
};

export default QuizList;
