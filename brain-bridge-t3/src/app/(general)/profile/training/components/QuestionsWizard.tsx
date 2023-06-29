"use client";
import Input from "~/app/components/Input";
import { useCallback, useState } from "react";
import invariant from "tiny-invariant";
import { type QuestionAndAnswer } from "@prisma/client";
import { type QuestionAndAnswerPartial } from "~/data/interfaces/types";

export const QuestionsAndTokens: QuestionAndAnswerPartial[] = [
  {
    question:
      "What is the specific topic that the language model should focus on?",
    answer: "",
    token: "{topic}",
  },
  {
    question: "What is the name the persona should use?",
    answer: "",
    token: "{name}",
  },
  {
    question:
      "What is the current year (for the purposes of the conversation)?",
    answer: new Date().getFullYear().toString(),
    token: "{current_year}",
  },
  {
    question: "What is the profession of the persona?",
    answer: "",
    token: "{profession}",
  },
  {
    question: "Where is the persona located?",
    answer: "",
    token: "{location}",
  },
  {
    question: "What are the specialties of the persona?",
    answer: "",
    token: "{specialties}",
  },
  {
    question:
      "How many years of experience does the persona have in their profession?",
    answer: "",
    token: "{years_of_experience}",
  },
  {
    question: "What is the birth year of the persona?",
    answer: "",
    token: "{birth_year}",
  },
  {
    question: "Where was the persona born?",
    answer: "",
    token: "{birth_city}",
  },
  {
    question: "Where did the persona grow up?",
    answer: "",
    token: "{childhood_city}",
  },
  {
    question: "What type of humor does the persona use?",
    answer: "",
    token: "{type_of_humor}",
  },
  {
    question:
      "What are other, perhaps related, topics that the persona can talk about?",
    answer: "",
    token: "{specific_topic}",
  },
  {
    question:
      "Could you provide your principles to live by for the persona (separate with commas)?",
    answer: "",
    token: "{csv:principles}",
  },
];

/**
 * @deprecated
 * @param param0 
 * @returns 
 */
export function QuestionsWizard({
  onStateChange,
  questionsAndTokens,
  disabled
}: {
  questionsAndTokens: QuestionAndAnswer[];
  onStateChange: (QuestionsAndTokens: QuestionAndAnswerPartial[]) => void;
  disabled?: boolean;
}) {
  const [questionsState, setQuestionsState] = useState(
    (questionsAndTokens &&
      questionsAndTokens.length > 0 &&
      questionsAndTokens) ||
      QuestionsAndTokens
  );
  const [questionIndex, setQuestionIndex] = useState(0);

  const setQuestionsStateAndNotify = useCallback(
    (newQuestionsState: QuestionAndAnswerPartial[]) => {
      setQuestionsState(newQuestionsState);
      onStateChange(newQuestionsState);
    },
    [onStateChange]
  );

  const handleNextQuestion = useCallback(() => {
    if (questionIndex < questionsState.length - 1) {
      setQuestionIndex(questionIndex + 1);
    }
  }, [questionIndex, questionsState.length]);

  const handlePreviousQuestion = useCallback(() => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    }
  }, [questionIndex]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Enter") {
        handleNextQuestion();
      } else if (e.key === "ArrowLeft") {
        handlePreviousQuestion();
      }
    },
    [handleNextQuestion, handlePreviousQuestion]
  );

  const handleQuestionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      const newQuestionsState = [...questionsState];
      const question = newQuestionsState[questionIndex];
      invariant(question, "Question index out of bounds");
      question.answer = val;
      setQuestionsStateAndNotify(newQuestionsState);
    },
    [questionIndex, questionsState, setQuestionsStateAndNotify]
  );

  const currentQuestion = questionsState[questionIndex];
  invariant(currentQuestion, "Question index out of bounds");
  const currentAnswer = currentQuestion.answer;

  return (
    <div className="p-2 mt-2 border rounded-lg shadow-md">
      <h1 className="mt-2 text-xl">
        Answer these Questions {questionIndex + 1} of {questionsState.length}
      </h1>
      <div className="flex flex-col">
        <div className="flex flex-col w-full">
          <div className="w-full p-2 mt-2 mr-2 rounded-md dark:border-slate-600 dark:bg-slate-700">
            {currentQuestion.question}
          </div>
          <div className="w-full p-2 mt-2 ml-2 rounded-md dark:border-slate-600 dark:bg-slate-700">
            <Input
              className="w-full p-2 mt-2 border rounded-md"
              type="text"
              value={currentAnswer}
              onChange={handleQuestionChange}
              onKeyUp={handleKeyDown}
              disabled={disabled}
    />
          </div>
        </div>
        <div className="flex flex-row">
          <button
            disabled={questionIndex === 0}
            className="w-1/2 p-2 mt-2 mr-2 text-white bg-blue-400 border rounded-md disabled:bg-slate-400 dark:border-blue-600 dark:bg-blue-700"
            onClick={handlePreviousQuestion}
          >
            Previous
          </button>
          <button
            disabled={questionIndex === questionsState.length - 1}
            className="w-1/2 p-2 mt-2 mr-2 text-white bg-blue-400 border rounded-md disabled:bg-slate-400 dark:border-blue-600 dark:bg-blue-700"
            onClick={handleNextQuestion}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
