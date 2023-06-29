import { DismissableInfoBox } from "~/app/components/InfoBox";
import SideBarPaddedContainer from "./components/SidebarPaddedContainer";

export default function Profile() {
  return (
    <SideBarPaddedContainer>
      <div className="p-6">
        <DismissableInfoBox type="info" title="Profile" body="This is the profile page." dismissable dismissableId="profile-page" />
      </div>
    </SideBarPaddedContainer>
  );
}
