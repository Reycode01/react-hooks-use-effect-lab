import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // Function to be executed after 1 second
    const timerId = setTimeout(() => {
      // Decrease timeRemaining by 1 every second
      setTimeRemaining(prevTime => prevTime - 1);
    }, 1000);

    // Cleanup function to clear the timeout
    return () => clearTimeout(timerId);
  }, [timeRemaining]); // Dependency array ensures useEffect runs when timeRemaining changes

  useEffect(() => {
    // If timeRemaining hits 0, reset to 10 seconds and call onAnswered with false
    if (timeRemaining === 0) {
      setTimeRemaining(10); // Reset timeRemaining
      onAnswered(false); // Call onAnswered callback with false
    }
  }, [timeRemaining, onAnswered]); // Dependency array includes timeRemaining and onAnswered

  function handleAnswer(isCorrect) {
    setTimeRemaining(10); // Reset timeRemaining for the next question
    onAnswered(isCorrect); // Call onAnswered callback with the provided parameter
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

