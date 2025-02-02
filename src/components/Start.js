import React, { useContext, useState, useEffect, useRef } from 'react';
import DataContext from '../context/dataContext';
import '../components/Start.css'; // Import the updated CSS

const Start = () => {
    const { startQuiz, quizStarted, showResult } = useContext(DataContext);
    const [showTitle, setShowTitle] = useState(false);
    const canvasRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowTitle(true);
        }, 800); // Faster title reveal
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let balls = [];

        class Ball {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.radius = Math.random() * 60 + 30;
                this.dx = (Math.random() - 0.5) * 0.7; // Slower movement
                this.dy = (Math.random() - 0.5) * 0.7;
                this.opacity = 0.2 + Math.random() * 0.3;
                this.color = `rgba(255, 255, 255, ${this.opacity})`;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
                ctx.shadowBlur = 15; // Glowing effect
                ctx.fill();
                ctx.closePath();
            }

            update() {
                if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
                    this.dx = -this.dx;
                }
                if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
                    this.dy = -this.dy;
                }
                this.x += this.dx;
                this.y += this.dy;
                this.draw();
            }
        }

        function init() {
            balls = [];
            for (let i = 0; i < 20; i++) {
                balls.push(new Ball());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            balls.forEach(ball => ball.update());
            requestAnimationFrame(animate);
        }

        init();
        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        });

    }, []);

    if (quizStarted || showResult) return null;

    return (
        <section className="start-section">
            {/* Canvas for Floating Balls Animation */}
            <canvas ref={canvasRef} className="animated-bg"></canvas>

            <div className="container text-center">
                {/* Welcome Message */}
                <h2 className="welcome-message">Welcome to the</h2>

                {/* Game Title */}
                {showTitle && <h1 className="quiz-title">QuiziFFy Game</h1>}

                {/* Start Button */}
                <button className="start-btn" onClick={startQuiz}>
                    Start Quiz
                </button>
            </div>
        </section>
    );
};

export default Start;
