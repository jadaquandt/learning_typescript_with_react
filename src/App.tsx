import React, {useState} from 'react';
import { fetchQuizQuestions } from './API';
//Components
import QuestionCard from './components/QuestionCard'
//Types
import { QuestionState, Difficulty } from './API';
//Styles
import { GlobalStyle, Wrapper } from './App.styles';

//If we want to display all the answers to the questions at the end of the game, this answer object will help with that
export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10; 

const App: React.FC = () => {
  //set state
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  // console.log(questions)

  //Function to start game
  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS, 
      Difficulty.EASY
      );

    setQuestions(newQuestions);
    //NEED TO CREATE ERROR HANDLING FOR THIS LATER
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);

  }

  //Function to check answers
  //Using react.mouse event and passing in what event happens <HTMLButtonElement>
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //Users answer
      const answer = e.currentTarget.value;
      //Check answer against correct answer from API
      const correct = questions[number].correct_answer === answer;

      if (correct) setScore(prev => prev +1);
      //Save answer in the array for users answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      };
      setUserAnswers(prev => [...prev, answerObject]);
    }
  }

  //Function to go to the next quetion
  const nextQuestion = () => {
    //Advance to next question if not the last question

    const nextQuestion = number +1;
    if (nextQuestion === TOTAL_QUESTIONS){
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  }

  return (
    <>
    <GlobalStyle />
  <Wrapper>
    <h1>React Quiz</h1>
    {/* Show start button only if game has yet to start */}
    {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (<button className="start" onClick={startTrivia}>
      Start
    </button>) : null}
    {/* Show score only if in a game */}
    {!gameOver ? <p className="score">Score: {score}</p> : null}
    {/* Only show if in a game */}
    {loading && <p>Loading Questions...</p>}
    {!loading && !gameOver && (
    <QuestionCard 
      questionNr={number + 1}
      totalQuestions={TOTAL_QUESTIONS}
      question={questions[number].question}
      answers={questions[number].answers}
      userAnswer={userAnswers ? userAnswers[number] : undefined}
      callback={checkAnswer}
    />
    )}
    {!gameOver && !loading && userAnswers.length === number +1 && number !== TOTAL_QUESTIONS - 1 ? (<button className="next" onClick={nextQuestion}>
      Next Question
    </button>): null }
    </Wrapper>
    </>
    );
}

export default App;
