"use server"

import invariant from "tiny-invariant";
import { getServerSession } from "@/server/auth";
import ServerData from "@/server/server-data";

export async function handleSettingsSubmit({ openAIApiKey }: { openAIApiKey: string }) {
  "use server";
  const session = await getServerSession();
  const regex = /^sk-[a-zA-Z0-9_-]{48}$/;
  if (!regex.test(openAIApiKey)) {
    return { status: false, errors: { openAIApiKey: "Invalid API key format" } }
  } else {
    invariant(session?.user.id != null, "User must be logged in");
    await ServerData.updateUserSettings({
      userId: session?.user.id,
      openAIApiKey,
    });
    return { status: true, errors: {} }
  }
}