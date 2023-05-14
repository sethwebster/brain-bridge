import PaddedContainer from "../components/padded-container";
import { SideBar } from "./chat/components/SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full bg-slate-100 dark:bg-slate-700">
      <div className="h-full p-4 sm:ml-64">
        <SideBar />
        <PaddedContainer>{children}</PaddedContainer>
      </div>
    </div>
  );
}
