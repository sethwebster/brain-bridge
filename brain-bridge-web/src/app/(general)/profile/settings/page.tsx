/* eslint-disable @typescript-eslint/no-misused-promises */
import { getServerSession } from "~/server/auth";
import SideBarPaddedContainer from "../components/SidebarPaddedContainer";
import ContentBoxWithHeading from "../components/ContentBoxWithHeading";
import ServerData from "~/server/server-data";
import Input from "~/app/components/Input";
import invariant from "tiny-invariant";
import delay from "~/utils/delay";
import { handleSettingsSubmit } from "./actions";
import Settings from "./components/Settings";

export default async function SettingsPage() {
  const settings = await ServerData.fetchUserSettings();
  const session = await getServerSession();

  const errors: string[] = [];
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
