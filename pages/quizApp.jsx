import React, { useState, useEffect } from 'react';
export default function QuizApp() {
  const [questions] = useState([
    {
      question: "What's the capital of France?",
      options: ['London', 'Berlin', 'Paris', 'Madrid'],
      answer: 'Paris',
    },
    {
      question: 'Which is not a JS Framework?',
      options: ['React', 'Vue', 'Hibernate', 'Angular'],
      answer: 'Hibernate',
    },
    // ...add more questions similarly
  ]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(10); // 10 seconds per question
  const [score, setScore] = useState(0);

  const handleAnswer = () => {
    if (selectedOption) {
      setShowAnswer(true);
      if (selectedOption === questions[currentQuestion].answer) {
        setScore((prev) => prev + 1);
        setMessage('Correct');
      } else setMessage('Wrong');
    } else {
      setMessage('Select option');
    }
  };
  const nextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1);
    setShowAnswer(false);
    setSelectedOption('');
    setMessage('');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) {
          nextQuestion(); // Move to next question if time runs out
          return 10; // Reset timer
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [currentQuestion]);

  return (
    <div className='min-h-screen bg-gray-100 p-2'>
      <h1>QuizApp</h1>
      <h2>{questions[currentQuestion].question} - {timer}</h2>
      {questions[currentQuestion].options.map((option, index) => (
        <div key={index}>
          <input
            id={`${option}-${index}`}
            type='radio'
            name='option'
            value={option}
            onChange={(e) => setSelectedOption(e.target.value)}
            className='mr-2'
          />
          {option}
        </div>
      ))}
      <button className='mr-2' onClick={handleAnswer}>
        Answer
      </button>
      {message && <p className='text-orange-600 mr-2'>{message} </p>}
      {showAnswer && (
        <p className='mr-2'>
          {' '}
          Correct Answer: {questions[currentQuestion].answer}
        </p>
      )}
      <button className='mr-2' onClick={nextQuestion}>
        Next Question
      </button>
      {currentQuestion} | {questions.length}
      {currentQuestion === questions.length && (
        <p>
          Your Score: {score}/{questions.length}
        </p>
      )}
    </div>
  );
}
