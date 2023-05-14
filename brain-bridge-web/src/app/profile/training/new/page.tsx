import PaddedContainer from "@/app/components/padded-container";
import { getServerSession } from "next-auth";
import NewTrainingSetForm from "./components/NewTrainingSetForm";
import invariant from "tiny-invariant";

export default async function NewTrainingSetPage() {
  const session = await getServerSession();
  invariant(session, "Session must exist")
  return (
    <PaddedContainer>
      <div className="w-full p-4 border-2 border-gray-700 border-dashed rounded-lg h-5/6">
        <header className="flex justify-between pb-2 border-b border-gray-600 border-dashed">
          <h1 className="text-2xl">New Training Set</h1>
        </header>
        {/* @ts-expect-error RSC */}
        <NewTrainingSetForm user={session.user} />
      </div>
    </PaddedContainer>
  );
}
