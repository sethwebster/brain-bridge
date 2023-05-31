import { getServerSession } from "next-auth";
import TrainingSetForm from "./components/TrainingSetForm";
import invariant from "tiny-invariant";
import promptTemplate, { promptFooter } from "./PromptTemplate";
import { QuestionsAndTokens } from "./components/QuestionsWizard";
import PaddedContainer from "@/app/(general)/components/PaddedContainer";

export default async function NewTrainingSetPage() {
  const session = await getServerSession();
  invariant(session, "Session must exist");
  invariant(session.user, "User must exist");
  return (
    <PaddedContainer>
      <div className="w-full h-auto p-4 border-2 border-gray-700  rounded-lg">
        <header className="flex justify-between pb-2 border-b border-gray-600 ">
          <h1 className="text-2xl">New Training Set</h1>
        </header>
        <TrainingSetForm
          user={session.user}
          promptTemplate={promptTemplate}
          promptFooter={promptFooter}
          trainingSet={{
            name: "",
            id: "<new>",
            sources: [],
            version: 0,
            dateCreated: new Date(),
            prompt: promptTemplate,
            userId: session.user.email!,
            shares: [],
            questionsAndAnswers: QuestionsAndTokens,
          }}
        />
      </div>
    </PaddedContainer>
  );
}
