const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let quizzes = []; // In-memory storage

// Create a new quiz
app.post('/api/quizzes', (req, res) => {
    const { title, questions } = req.body;
    const id = quizzes.length + 1;
    const newQuiz = { id, title, questions };
    quizzes.push(newQuiz);
    res.status(201).json(newQuiz);
});

// Get all quizzes
app.get('/api/quizzes', (req, res) => {
    res.json(quizzes);
});

// Get quiz by ID
app.get('/api/quizzes/:id', (req, res) => {
    const quiz = quizzes.find(q => q.id == req.params.id);
    quiz ? res.json(quiz) : res.status(404).json({ message: 'Quiz not found' });
});

// Submit answers
app.post('/api/quizzes/:id/submit', (req, res) => {
    const { answers } = req.body;
    const quiz = quizzes.find(q => q.id == req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    let score = 0;
    const results = quiz.questions.map((q, index) => {
        const isCorrect = q.correctAnswer === answers[index];
        if (isCorrect) score++;
        return {
            question: q.question,
            selected: answers[index],
            correct: q.correctAnswer,
            isCorrect
        };
    });

    res.json({ score, total: quiz.questions.length, results });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
