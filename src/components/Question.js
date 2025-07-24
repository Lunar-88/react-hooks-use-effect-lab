
import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // ✅ Countdown timer logic using useEffect
  useEffect(() => {
    if (timeRemaining === 0) {
      setTimeRemaining(10);        // reset timer for next question
      onAnswered(false);           // treat as incorrect answer
      return;                      // stop countdown
    }

    const timeoutId = setTimeout(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    // 🧹 Cleanup: prevent memory leaks or overlapping timers
    return () => clearTimeout(timeoutId);

  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;

