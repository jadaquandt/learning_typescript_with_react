import React from 'react';
import { Wrapper, ButtonWrapper } from './QuestionCard.styles';
import { AnswerObject } from '../App';

//Can be named anything we want, we will just stick with "props" for this
type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNr: number;
    totalQuestions: number;
}
//To make this a functional component we use the .FC property from React
//And pass in our Props from above in <>
const QuestionCard: React.FC<Props> = ({
    question, 
    answers, 
    callback, 
    userAnswer, 
    questionNr, 
    totalQuestions
}) => (
    <Wrapper>
        <p className="number">
            Question: {questionNr} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{__html: question}} />
        <div>
            {answers.map(answer => (
                <ButtonWrapper  
                key={answer}
                correct={userAnswer?.correctAnswer === answer}
                userClicked={userAnswer?.answer === answer}>
                    <button disabled={userAnswer ? true: false} value={answer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{__html: answer}}></span>
                    </button>
                </ButtonWrapper>
            ))}
        </div>
    </Wrapper>
    );

export default QuestionCard
