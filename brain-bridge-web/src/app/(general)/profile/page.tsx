import DismissableInfoBox from "~/app/components/DismissableInfoBox";
import SideBarPaddedContainer from "./components/SidebarPaddedContainer";
import { getServerSession } from "~/server/auth";
import ServerData from "~/server/server-data";
import InfoBox from "~/app/components/InfoBox";
import Link from "next/link";

export default async function Profile() {
  const session = await getServerSession();
  const userSettings = await ServerData.fetchUserSettings();

  return (
    <SideBarPaddedContainer>
      <div className="p-6">
        {!userSettings && (
          <InfoBox type="warning" title="Some configuration is required">
            <p>
              You have not yet configured your profile. Please go to the <Link href="/profile/settings" className="font-bold text-amber-700">settings page</Link> to configure your profile.
            </p>
          </InfoBox>
        )}
        {userSettings && (!userSettings.openAIApiKey || userSettings?.openAIApiKey?.length === 0) && (
          <InfoBox type="warning" title="Some configuration is required">
          <p>
            You have not yet set your OpenAI Api Key. Please go to the <Link href="/profile/settings" className="font-bold text-amber-700">settings page</Link> to configure your profile.
          </p>
        </InfoBox>
      )}
        <DismissableInfoBox type="info" title="Profile" body="This is the profile page." dismissable dismissableId="profile-page" />
      </div>
    </SideBarPaddedContainer>
  );
}
