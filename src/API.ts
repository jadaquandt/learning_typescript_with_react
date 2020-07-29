//Importing array to shuffle what gets returned
import { shuffleArray } from './utils'

//consts of difficulty, using enum feature of TS
export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}

//Question type based on what API returns
export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
};

//I want to make all the answers combine into one array to map through for rendering
export type QuestionState = Question & { answers: string[]};

export const fetchQuizQuestions = async(amount: number, difficulty: Difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&category=27&type=multiple`;
    //First we await the fetch, then we await when we convert to JSON
    const data = await (await fetch(endpoint)).json();
    return data.results.map((question: Question) => (
        //spread the array and then shuffle the answers
        {
        ...question,
        answer: shuffleArray([...question.incorrect_answers, question.correct_answer])
    }
    ))
}