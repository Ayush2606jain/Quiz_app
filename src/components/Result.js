import React, { useContext } from 'react';
import DataContext from '../context/dataContext';
import '../components/Result.css'; // Import the new styling

const Result = () => {
    const { showResult, quizs, marks, startOver } = useContext(DataContext);

    if (!showResult) return null;

    const totalMarks = quizs.length * 5;
    const percentage = ((marks / totalMarks) * 100).toFixed(2);
    let resultMessage = '';

    if (percentage >= 80) {
        resultMessage = "🎉 Excellent! You're a quiz master! 🎉";
    } else if (percentage >= 50) {
        resultMessage = "😊 Good job! Keep improving!";
    } else {
        resultMessage = "😟 Keep trying! Practice makes perfect!";
    }

    return (
        <section className="result-section">
            <div className="result-card">
                {/* Motivational Message */}
                <h1 className="result-title">{resultMessage}</h1>

                {/* Score Details */}
                <p className="score-text">Your Score: <b>{marks}</b> / {totalMarks}</p>
                <p className="percentage-text">Percentage: <b>{percentage}%</b></p>

                {/* Start Over Button */}
                <button className="start-over-btn" onClick={startOver}>
                    🔄 Start Over
                </button>
            </div>
        </section>
    );
};

export default Result;
