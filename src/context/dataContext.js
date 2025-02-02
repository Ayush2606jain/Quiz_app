import { createContext, useState, useEffect } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  // Quiz State Variables
  const [quizs, setQuizs] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [marks, setMarks] = useState(0);

  // Display Control States
  const [quizStarted, setQuizStarted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showStart, setShowStart] = useState(true); // Controls the Start screen visibility

  // Load JSON Data from API
  useEffect(() => {
    fetch('https://api.allorigins.win/get?url=https://api.jsonserve.com/Uw5CrX')
      .then(res => res.ok ? res.json() : Promise.reject('Network error'))
      .then(data => {
        try {
          const response = JSON.parse(data.contents);
          if (Array.isArray(response.questions)) {
            setQuizs(response.questions);
          } else {
            console.error("Error: Data format is incorrect.");
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      })
      .catch(err => console.error('Error fetching quiz data:', err));
  }, []);

  // Get Current Question
  const question = quizs[questionIndex] || {};

  // Start Quiz (Ensures Q1 is Centered)
  const startQuiz = () => {
    setShowStart(false);
    setQuizStarted(true);
    setShowResult(false);
    setMarks(0);
    setQuestionIndex(0);
    setSelectedAnswer('');

    // Ensure smooth scrolling to center the first question
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  // Check Answer
  const checkAnswer = (e, selected, options) => {
    e.preventDefault();
    const correctOption = options.find(option => option.is_correct);
    setSelectedAnswer(selected);

    if (correctOption) {
      if (selected.description === correctOption.description) {
        setMarks((prevMarks) => prevMarks + 5);
      }
    } else {
      console.error("Error: No correct option found for this question.");
    }
  };

  // Next Question
  const nextQuestion = () => {
    if (questionIndex < quizs.length - 1) {
      setSelectedAnswer('');
      setQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setQuizStarted(false);
      setShowResult(true);
    }
  };

  // Restart Quiz (Fixes Start Over Issue)
  const startOver = () => {
    setShowStart(true); // Show Start screen again
    setQuizStarted(false); // Ensure quiz is not running
    setShowResult(false); // Hide the result screen
    setMarks(0); // Reset score
    setQuestionIndex(0); // Reset question index to 1st question
    setSelectedAnswer(''); // Reset selected answer

    // Scroll to the top to ensure proper layout
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <DataContext.Provider
      value={{
        showStart,
        quizStarted,
        startQuiz,
        showResult,
        question,
        checkAnswer,
        selectedAnswer,
        questionIndex,
        nextQuestion,
        marks,
        startOver,
        quizs,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
