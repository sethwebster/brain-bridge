import PaddedContainer from "@/app/components/padded-container";
import { getServerSession } from "next-auth";
import TrainingSetForm from "./components/TrainingSetForm";
import invariant from "tiny-invariant";
import promptTemplate, { promptFooter } from "./prompt-template";
import { QuestionsAndTokens } from "./components/QuestionsWizard";

export default async function NewTrainingSetPage() {
  const session = await getServerSession();
  invariant(session, "Session must exist");
  invariant(session.user, "User must exist");
  return (
    <PaddedContainer>
      <div className="w-full h-auto p-4 border-2 border-gray-700 border-dashed rounded-lg">
        <header className="flex justify-between pb-2 border-b border-gray-600 border-dashed">
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
            questionsAndAnswers: QuestionsAndTokens,
          }}
        />
      </div>
    </PaddedContainer>
  );
}
