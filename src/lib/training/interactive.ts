import { spawn, spawnSync } from "child_process";
import { OpenAIChat } from "langchain/llms";
import path from "path";
import PromptSync from "prompt-sync";

interface TrainingSession {
  prompt: string;
  name: string;
  questions: Question[];
}

interface Question {
  question: string;
  answer: string;
  autoGenerated: boolean;
}

const promptTemplate = `
  --- instructions ---
  I am providing you with a prompt you will answer. 
  This prompt will require you to generate a list of questions on a particular subject. Please give me {numberOfQuestions} questions.
  Return only the list of questions as array of items in the following JSON format (make sure to include the square brackets around the list of items, even if it's one item):
  {
    question: "<question>",
    answer: "<a short answer>",
    autoGenerated: true
  }
  --- end instructions ---
  --- question ---
  {question}
  --- end question ---
  --- previous context ---
  You have already given me the following questions to answer:
  
  {previousQuestions}

  Make sure to give me all new questions.
  --- end previous context ---
`;


async function gatherPrompt(): Promise<string> {
  const prompt = PromptSync();
  console.log("First, enter a prompt to train on. eg. 'You are an expert photography teacher. What are all the questions beginner students will need answered in order to become an expert?'")
  const promptStr = await prompt("Enter a prompt >");
  return promptStr;
}
async function gatherNumberOfQuestions(): Promise<number> {
  const prompt = PromptSync();
  console.log("How many questions do you want to answer now?")
  const answer = await prompt("Enter a number >");
  return parseInt(answer);
}

async function gatherQuestions(session: TrainingSession, numberOfQuestions: number): Promise<Question[]> {
  const model = new OpenAIChat({
    temperature: 0.2,
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: 'gpt-3.5-turbo'
  });
  const previousQuestionsText = session.questions.map(q => q.question).join("\n");
  const formattedPrompt = promptTemplate
    .replace("{question}", session.prompt)
    .replace("{previousQuestions}", previousQuestionsText)
    .replace("{numberOfQuestions}", numberOfQuestions.toString());
  const response = await model.generate([formattedPrompt])
  const flat = response.generations.flat();

  const responses = flat.map(f => JSON.parse(f.text) as Question).flat();
  return responses;
}

async function gatherTrainingSetName(): Promise<string> {
  const prompt = PromptSync();
  const name = await prompt("Enter a name for this training set >");
  return name;
}
const fs = require('fs');
async function handleFileExists(fileName: string, defaultSession: TrainingSession): Promise<TrainingSession> {
  if (fs.existsSync(fileName)) {
    //TODO: Handle Resume
    const prompt = PromptSync();
    const overwrite = await prompt("This training set already exists. Resume (y), Overwrite (o)? (y/o) >");
    if (overwrite.toLowerCase() === "o") {
      await fs.unlinkSync(fileName);
      return defaultSession;
    }
    const data = fs.readFileSync(fileName, 'utf-8');
    const existingSession = JSON.parse(data) as TrainingSession;
    return existingSession;
  } else {
    return defaultSession;
  }
}

async function askQuestions(questions: Question[], resume: boolean = false) {
  const questionTemplate = "Question {i} of {total}: {question} \n Generated Answer: {answer} \n\n(blank accepts)\n Your Answer > ";
  const prompt = PromptSync();
  for (const question of questions) {
    if (!question.autoGenerated && (question.answer || "").length > 0) continue;
    const answer = await prompt(
      questionTemplate
        .replace("{i}", questions.indexOf(question).toString())
        .replace("{total}", questions.length.toString())
        .replace("{question}", question.question)
        .replace("{answer}", question.answer)
    );
    question.answer = answer === "" ? question.answer : answer;
    question.autoGenerated = false;
  }
  return questions;
}

async function askHowToProceed(): Promise<"train" | "questions" | "exit"> {
  const prompt = PromptSync();
  const howToProceed = await prompt("How to proceed? (t)rain model, get more (q)uestions, e(x)it (t/q/x) > ");
  switch (howToProceed.toLowerCase()) {
    case "t":
      return "train";
    case "q":
      return "questions";
    case "x":
      return "exit";
    default:
      console.log("Invalid option");
      return await askHowToProceed();
  }
}

async function interactiveTraining() {
  const name = await gatherTrainingSetName();
  const fileName = "./src/training-data/" + name.toLowerCase().replace(" ", "-") + ".json";
  let session = await handleFileExists(fileName, { name, questions: [], prompt: "" });
  let numberOfQuestions = 10;
  if (session.questions.length === 0) {
    session.prompt = await gatherPrompt();
    numberOfQuestions = await gatherNumberOfQuestions() || numberOfQuestions;
    session.questions = await gatherQuestions(session, numberOfQuestions);
  }
  session.questions = await askQuestions(session.questions);
  fs.writeFileSync(fileName, JSON.stringify(session, null, 2));
  let exit = false;
  while (!exit) {
    const howToProceed = await askHowToProceed();
    switch (howToProceed) {
      case "train":
        console.log("Training...");
        spawnSync("npm", ["run", "train"], { stdio: "inherit", shell: true })
        break;
      case "questions":
        console.log("Getting more questions...");
        numberOfQuestions = await gatherNumberOfQuestions() || numberOfQuestions;
        const additionalQuestions = await gatherQuestions(session, numberOfQuestions);
        session.questions = session.questions.concat(additionalQuestions);
        session.questions = await askQuestions(session.questions);
        fs.writeFileSync(fileName, JSON.stringify(session, null, 2));
        break;
      case "exit":
        console.log("Exiting");
        exit = true;
        break;
    }
  }
}

interactiveTraining();