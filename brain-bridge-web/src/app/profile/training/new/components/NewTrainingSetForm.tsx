"use client";

import { useState } from "react";

export default function NewTrainingSetForm({
  user,
}: {
  user: { email?: string | null | undefined; name?: string | null | undefined };
}) {
  const [trainingSetData, setTrainingSetData] = useState<TrainingSet>({
    name: "",
    id: "<new>",
    sources: [],
    version: 0,
    dateCreated: new Date(),
    prompt: "",
  });
  return <div>
    <input className="w-full p-2 mt-2 border rounded-md bg-slate-700 border-slate-600" alt="Training Set Name" placeholder="Training Set Name" type="text" name="name" value={trainingSetData.name} onChange={(e) => setTrainingSetData({...trainingSetData, name: e.target.value})} />
  </div>;
}
