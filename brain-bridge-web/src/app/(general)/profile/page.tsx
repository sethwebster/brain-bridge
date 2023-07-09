import DismissableInfoBox from "~/app/components/DismissableInfoBox";
import SideBarPaddedContainer from "./components/SidebarPaddedContainer";
import ServerData from "~/server/server-data";
import InfoBox from "~/app/components/InfoBox";
import Link from "next/link";
import GettingStarted from "./components/GettingStarted";

export default async function Profile() {
  const userSettingsRequest = ServerData.fetchUserSettings();
  const setsRequest = ServerData.fetchUserTrainingSets();
  const chatsRequest = ServerData.fetchPublicChats();
  const [userSettings, sets, chats] = await Promise.all([
    userSettingsRequest,
    setsRequest,
    chatsRequest,
  ]);
  const first = sets[0];
  return (
    <SideBarPaddedContainer>
      <div className="p-6">
        {!userSettings && (
          <InfoBox type="warning" title="Some configuration is required">
            <p>
              You have not yet configured your profile. Training, chat, and
              other features will be disabled until configured. Please go to the{" "}
              <Link
                href="/profile/settings"
                className="font-bold text-amber-700"
              >
                settings page
              </Link>{" "}
              to configure your profile.
            </p>
          </InfoBox>
        )}
        <GettingStarted
          trainingSetHasDataSources={(first?.trainingSources?.length ?? 0) > 0}
          trainingSetTrained={(first?.version ?? 0) > 0 ?? false}
          trainingSetHasPrompt={(first?.prompt ?? "").length > 0}
          trainingSets={sets.length}
          userSettings={userSettings}
          publicChats={chats.length}
        />
        {userSettings &&
          (!userSettings.openAIApiKey ||
            userSettings?.openAIApiKey?.length === 0) && (
            <InfoBox type="warning" title="Some configuration is required">
              <p>
                You have not yet set your OpenAI Api Key. Please go to the{" "}
                <Link
                  href="/profile/settings"
                  className="font-bold text-amber-700"
                >
                  settings page
                </Link>{" "}
                to configure your profile.
              </p>
            </InfoBox>
          )}
        <DismissableInfoBox
          type="info"
          title="Profile"
          body="This is the profile page."
          dismissable
          dismissableId="profile-page"
        />
      </div>
    </SideBarPaddedContainer>
  );
}
