import React, { useState } from 'react';

const CreateQuiz = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);

  const handleChange = (index, field, value) => {
    const updated = [...questions];
    if (field === 'question') updated[index].question = value;
    else if (field === 'correctAnswer') updated[index].correctAnswer = value;
    else updated[index].options[field] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/quizzes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, questions })
    });
    alert('Quiz created!');
  };

  return (
    <div>
      <h2>Create a Quiz</h2>
      <input placeholder="Quiz Title" value={title} onChange={e => setTitle(e.target.value)} />
      {questions.map((q, i) => (
        <div key={i}>
          <input placeholder="Question" value={q.question} onChange={e => handleChange(i, 'question', e.target.value)} />
          {q.options.map((opt, j) => (
            <input key={j} placeholder={`Option ${j+1}`} value={opt} onChange={e => handleChange(i, j, e.target.value)} />
          ))}
          <input placeholder="Correct Answer" value={q.correctAnswer} onChange={e => handleChange(i, 'correctAnswer', e.target.value)} />
        </div>
      ))}
      <button onClick={addQuestion}>Add Question</button>
      <button onClick={handleSubmit}>Submit Quiz</button>
    </div>
  );
};

export default CreateQuiz;
