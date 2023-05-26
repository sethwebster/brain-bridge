import invariant from "tiny-invariant";
import PaddedContainer from "~/app/components/PaddedContainer";
import { getServerSession } from "~/server/auth";
import TrainingSetPage from "./components/TrainingSetForm";
import promptTemplate, { promptFooter } from "./PromptTemplate";
import { QuestionsAndTokens } from "./components/QuestionsWizard";
import { type QuestionAndAnswer } from "@prisma/client";

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
        <TrainingSetPage
          user={session.user}
          promptTemplate={promptTemplate}
          promptFooter={promptFooter}
          trainingSet={{
            name: "",
            id: "",
            trainingSources: [],
            version: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            prompt: promptTemplate,
            userId: session.user.id,
            conversations: [],
            trainingIndexId: "",
            // shares: [],
            questionsAndAnswers: QuestionsAndTokens as QuestionAndAnswer[],
          }}
        />
      </div>
    </PaddedContainer>
  );
}
