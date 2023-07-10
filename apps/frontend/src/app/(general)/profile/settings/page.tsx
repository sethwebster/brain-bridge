/* eslint-disable @typescript-eslint/no-misused-promises */
import { getServerSession } from "@/server/auth";
import ContentBoxWithHeading from "../components/ContentBoxWithHeading";
import ServerData from "@/server/server-data";
import invariant from "tiny-invariant";
import Settings from "./components/Settings";

export default async function SettingsPage() {
  const settings = await ServerData.fetchUserSettings();
  const session = await getServerSession();

  invariant(session, "Session must be defined");
  return (
    <ContentBoxWithHeading
      heading={
        <>
          <h1 className="text-xl">Settings</h1>
        </>
      }
    >
      <Settings
        settings={settings ?? { openAIApiKey: "", userId: session?.user.id }}
      />
    </ContentBoxWithHeading>
  );
}
