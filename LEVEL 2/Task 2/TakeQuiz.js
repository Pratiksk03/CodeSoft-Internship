import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TakeQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:5000/api/quizzes/${id}`)
      .then(res => res.json())
      .then(data => {
        setQuiz(data);
        setAnswers(Array(data.questions.length).fill(''));
      });
  }, [id]);

  const selectAnswer = (ans) => {
    const newAnswers = [...answers];
    newAnswers[current] = ans;
    setAnswers(newAnswers);
  };

  const next = () => {
    if (current < quiz.questions.length - 1) {
      setCurrent(current + 1);
    } else {
      fetch(`http://localhost:5000/api/quizzes/${id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers })
      })
        .then(res => res.json())
        .then(result => {
          navigate('/result', { state: result });
        });
    }
  };

  if (!quiz) return <p>Loading...</p>;

  const q = quiz.questions[current];

  return (
    <div>
      <h3>{q.question}</h3>
      {q.options.map((opt, i) => (
        <div key={i}>
          <input
            type="radio"
            name="option"
            value={opt}
            checked={answers[current] === opt}
            onChange={() => selectAnswer(opt)}
          /> {opt}
        </div>
      ))}
      <button onClick={next}>{current < quiz.questions.length - 1 ? 'Next' : 'Submit'}</button>
    </div>
  );
};

export default TakeQuiz;
