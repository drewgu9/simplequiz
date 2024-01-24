import { useState } from "react";
import "./App.css";
import questions from "./data/questions";

function App() {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [total, setTotal] = useState(0);

  const [ended, setEnded] = useState(false);

  function submitQuestion(e) {
    e.preventDefault();
    if (selectedAnswer === null) return;

    if (!ended && questions[questionNumber].correctAnswer === selectedAnswer) {
      setTotal(total + 1);
    }

    if (questionNumber < questions.length - 1) {
      setQuestionNumber(questionNumber + 1);
    } else if (questionNumber == questions.length - 1) {
      setEnded(true);
    }
    setSelectedAnswer(null);
  }

  return (
    <>
      <h1>{questions[questionNumber].prompt}</h1>
      <form
        onSubmit={(e) => {
          submitQuestion(e);
        }}
      >
        {questions[questionNumber].answers.map((answer, index) => {
          return (
            <div key={index}>
              <label htmlFor={index}> {answer.response} </label>
              <input
                id={index}
                key={index}
                type="radio"
                value={answer.response}
                name="answer"
                checked={selectedAnswer === answer.response}
                onChange={() => {
                  setSelectedAnswer(answer.response);
                }}
              />
            </div>
          );
        })}

        <button>Submit</button>
      </form>

      <h3>{total}</h3>
    </>
  );
}

export default App;
