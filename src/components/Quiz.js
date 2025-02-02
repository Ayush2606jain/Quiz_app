import React, { useContext, useState } from 'react';
import DataContext from '../context/dataContext';
import '../components/Quiz.css'; // Import the updated CSS

const Quiz = () => {
    const {
        question,
        quizs,
        quizStarted,
        checkAnswer,
        selectedAnswer,
        nextQuestion,
        marks
    } = useContext(DataContext);

    const [isDisabled, setIsDisabled] = useState(false);
    const [clickedOption, setClickedOption] = useState(null);

    if (!quizStarted) return null;

    const correctAnswer = question.options.find(option => option.is_correct);

    const handleAnswerClick = (e, option) => {
        setClickedOption(option);
        checkAnswer(e, option, question.options);
        setIsDisabled(true);
    };

    return (
        <section className="quiz-section">
            <div className="container">
                <div className="quiz-card">
                    {/* Display Question Number */}
                    <h2 className="question-text">
                        Q{quizs.indexOf(question) + 1}: {question.description}
                    </h2>

                    {/* Render Question Options */}
                    <div className="options">
                        {question.options.map(option => (
                            <button
                                key={option.id}
                                className={`option-btn 
                                    ${clickedOption && option === correctAnswer ? 'correct' : ''} 
                                    ${clickedOption && option === clickedOption && option !== correctAnswer ? 'wrong' : ''}`
                                }
                                onClick={(e) => handleAnswerClick(e, option)}
                                disabled={isDisabled}
                            >
                                {option.description}
                            </button>
                        ))}
                    </div>

                    {/* Show Correct/Incorrect Message */}
                    {selectedAnswer && (
                        <div className="result-message">
                            {selectedAnswer.description === correctAnswer.description ? 
                                <p className="correct-msg">✅ Correct Answer!</p> 
                                : <p className="wrong-msg">❌ Incorrect. The correct answer is <b>{correctAnswer.description}</b></p>
                            }
                        </div>
                    )}

                    {/* Next Question Button */}
                    <button className="next-btn" onClick={() => { nextQuestion(); setIsDisabled(false); setClickedOption(null); }}>
                        Next Question ➡️
                    </button>

                    {/* Show Total Score */}
                    <p className="score-text">Your current score: <b>{marks}</b></p>
                </div>
            </div>
        </section>
    );
};

export default Quiz;
